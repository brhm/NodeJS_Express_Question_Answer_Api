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
    const question= await Question
    .findById(question_id)
    .populate("answers");

    const answers=question.answers;
    return res.status(200)
    .json({
        success:true,
        count:answers.length,
        data:answers
    });
});

const getSingleAnswer=asyncErrorWrapper(async(req,res,next)=>{

    const {answer_id}=req.params;
    
    const answer=await Answer
    .findById(answer_id)
    .populate({
        path:"question",
        select:"title content" // sadece göstermek istediğimiz alanları bu şekilde çekiyoruz.
    })
    .populate({
        path:"user",
        select:"name email profile_image"
    });
    
    return res.status(200)
    .json({
        success:true,
        data:answer
    });
});
const editAnswwer=asyncErrorWrapper(async(req,res,next)=>{

    const {answer_id}=req.params;
    const{content}=req.body;
    let answer=await Answer.findById(answer_id);

    answer.content=content;

    await answer.save();
    return res.status(200)
    .json({
        success:true,
        data:answer
    });
});
const deleteAnswwer=asyncErrorWrapper(async(req,res,next)=>{

    const {answer_id}=req.params;
    const {question_id}=req.params;
    
    
    await Answer.findByIdAndRemove(answer_id);

    const question=await Question.findById(question_id);

    question.answers.splice(question.answers.indexOf(answer_id),1);// answer id sinin question dan silme işlemi. answer arraydaki index üzerinde siliyoruz.
    
    await question.save();

    return res.status(200)
    .json({
        success:true,
        message:"Answer deleted successfully"
    });
});


module.exports={
    addNewAnswerToQuestion,
    getAllAnswersByQuestion,
    getSingleAnswer,
    editAnswwer,
    deleteAnswwer
}