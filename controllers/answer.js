const Question=require("../models/Question");
const Answer=require("../models/Answer");
const CustomError=require("../helpers/error/CustomError");

const asyncErrorWrapper=require("express-async-handler");

const addNewAnswerToQuestion=asyncErrorWrapper(async(req,res,next)=>{
    const {question_id}=req.params;

    const user_id=req.user.id;

    const information=req.body;
    const answer=await Answer.create({
        ...information,
        question:question_id,
        user:user_id
    });

    return res.status(200)
    .json({
        success:true,
        data:answer
    });
});
const getAllAnswersByQuestion=asyncErrorWrapper(async(req,res,next)=>{

    const {question_id}=req.params;
// populate ile ilişkili olduğu diğer objelerin detayıda çekmiş oluyoruz.
// qusiton dataki answerlerin detaylarını obje ile çekmiş olacağız
    const question= await Question.findById(question_id).populate("answers");
console.log("data : "+question.answers);
    const answers=question.answers;
    return res.status(200)
    .json({
        success:true,
        cousnt:answers.length,
        data:answers
    });
});

module.exports={
    addNewAnswerToQuestion,
    getAllAnswersByQuestion
}