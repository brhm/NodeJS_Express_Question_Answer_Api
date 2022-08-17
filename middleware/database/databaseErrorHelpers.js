const User=require("../../models/User");
const Question=require("../../models/Question");
const CustomError=require("../../helpers/error/CustomError");
const asyncErrorWrapper=require("express-async-handler");

const checkUserExist=asyncErrorWrapper(async(req,res,next)=>{

    const {id}=req.params;
    const user=await User.findById(id);
    if(!user)
    {
        return next(new CustomError("There is no such user with that id",400));
    }
    //req.data=user; 2. defa user sorgusu yapmamk için bu şekilde userı bir sonraki methoda aktarabiliriz.
    next();
});

const checkQuestionExist=asyncErrorWrapper(async(req,res,next)=>{

    const {id}=req.params;
    
    const question=await Question.findById(id);
    if(!question)
    {
        return next(new CustomError("There is no such question with that id",400));
    }
    //req.data=user; 2. defa user sorgusu yapmamk için bu şekilde question'ı bir sonraki methoda aktarabiliriz.
    next();
});

module.exports={
    checkUserExist,
    checkQuestionExist
};