const Question =require("../models/Question");
const CustomError=require("../helpers/error/CustomError");
const asyncErrorHandler =require("express-async-handler");

const askNewQuestion=asyncErrorHandler(async(req,res,next)=>{

    const information=req.body;
    const question=await Question.create({
        ...information, // information içindeki parametreleri ... ile question alanlarına eşliyor
        user:req.user.id
    });

    res.status(200)
    .json({
        success:true,
        data:question
    })
});

const getAllQuestions=asyncErrorHandler(async(req,res,next)=>{

    const questions=await Question.find({});
    res.status(200)
    .json({
        success:true,
        data:questions
    });
});

const getSingleQuestion=asyncErrorHandler(async(req,res,next)=>{

    const {id}=req.params;
    
    const question=await Question.findById(id);

    return res.status(200)
    .json({
        success:true,
        data:question
    });
});

module.exports={
    getAllQuestions,
    askNewQuestion,
    getSingleQuestion
}