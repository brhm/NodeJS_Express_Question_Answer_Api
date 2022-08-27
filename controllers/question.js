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
   return res.status(200)
    .json(res.queryResults);
});

const getSingleQuestion=asyncErrorHandler(async(req,res,next)=>{
    return res.status(200).json(res.queryResults);
});

const editQuestion=asyncErrorHandler(async(req,res,next)=>{

    const {id}=req.params;
    const {title,content}=req.body;
    console.log("title:" +title);
    console.log("id:"+ id);
    let question=await Question.findById(id);
    question.title=title;
    question.content=content;

    question=await question.save();

    return res.status(200)
    .json({
        success:true,
        data:question
    });    
});

const deleteQuestion=asyncErrorHandler(async(req,res,next)=>{
    const {id}=req.params;

    await Question.findByIdAndDelete(id);

    return res.status(200)
    .json({
        success:true,
        data:"Question delete operation is successful"
    }); 
});

const likeQuestion=asyncErrorHandler(async(req,res,next)=>{
    const {id}=req.params;

    const question=await Question.findById(id);
    
    //like etmişse
    if(question.likes.includes(req.user.id))
    {
        return next(new CustomError("You already liked this question",400));
    }

    question.likes.push(req.user.id);
    question.likeCount=question.likes.length;

    await question.save();

    return res.status(200)
    .json({
        success:true,
        data:question
    })
});

const undoLikeQuestion=asyncErrorHandler(async(req,res,next)=>{
    const {id}=req.params;

    const question=await Question.findById(id);
    
    //like etmişse
    if(!question.likes.includes(req.user.id))
    {
        return next(new CustomError("You can't undo like operation for this question",400));
    }

    const index=question.likes.indexOf(req.user.id);
    question.likes.splice(index,1);    
    question.likeCount=question.likes.length;
    await question.save();

    return res.status(200)
    .json({
        success:true,
        data:question
    })
});

module.exports={
    getAllQuestions,
    askNewQuestion,
    getSingleQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion,
    undoLikeQuestion
}