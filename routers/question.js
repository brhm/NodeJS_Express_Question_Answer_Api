const express =require("express");
const {getSingleQuestion, getAllQuestions,askNewQuestion,editQuestion,deleteQuestion,likeQuestion,undoLikeQuestion}=require("../controllers/question"); 
const {checkQuestionExist}=require("../middleware/database/databaseErrorHelpers");
const {getAccessToRoute,getQuestionOwnerAccess}=require("../middleware/authorization/auth");

const question=require("../models/Question");
const answer=require("./answer");

const questionQueryMiddleware=require("../middleware/query/questionQueryMiddleware");
const answerQueryMiddleware=require("../middleware/query/answerQueryMiddleware");
const Question = require("../models/Question");

//api/question
const router=express.Router();

router.get("/",questionQueryMiddleware(
    question,{
        population:{
            path:"user",
            select:"name profil_image"
        }
    }
),getAllQuestions);
router.get("/:id",checkQuestionExist,answerQueryMiddleware(Question), getSingleQuestion);
router.post("/ask", getAccessToRoute,askNewQuestion);
router.put("/:id/edit",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],editQuestion)
router.delete("/:id/delete",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],deleteQuestion)
router.get("/:id/like",[getAccessToRoute,checkQuestionExist],likeQuestion)
router.get("/:id/undolike",[getAccessToRoute,checkQuestionExist],undoLikeQuestion)

// question üzerinden answera yönlendirmesi yapıyoruz.
//api/<quesiont_id>/answers => answer route na yönlendiriyoruz.
router.use("/:question_id/answers",checkQuestionExist,answer);


module.exports=router;