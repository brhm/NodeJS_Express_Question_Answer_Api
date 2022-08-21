const User=require("../../models/User");
const Question=require("../../models/Question");
const Answer=require("../../models/Answer");
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

    const question_id=req.params.id || req.params.question_id;
    
    const question=await Question.findById(question_id);
    if(!question)
    {
        return next(new CustomError("There is no such question with that id",400));
    }
    //req.data=user; 2. defa user sorgusu yapmamk için bu şekilde question'ı bir sonraki methoda aktarabiliriz.
    next();
});

const checkQuestionAndAnswerExist=asyncErrorWrapper(async(req,res,next)=>{
    const question_id=req.params.question_id;
    const answer_id=req.params.answer_id;

    console.log(`question: ${question_id} , answer: ${answer_id} `);
    const answer=await Answer.findOne({
        _id:answer_id,
        question:question_id
    });
    
    if(!answer)
    {
     return next(
        new CustomError("There is no answer with if assouciated with quesition id",400)
     );   
    }
    next();
});

module.exports={
    checkUserExist,
    checkQuestionExist,
    checkQuestionAndAnswerExist
};