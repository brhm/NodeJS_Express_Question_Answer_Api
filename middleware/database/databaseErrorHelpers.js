const User=require("../../models/User");
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

module.exports={checkUserExist};