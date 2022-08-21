const express=require("express");
const {getAccessToRoute}=require("../middleware/authorization/auth");
const {addNewAnswerToQuestion,getAllAnswersByQuestion,getSingleAnswer,editAnswwer,deleteAnswwer,likeAnswer,undoLikeAnswer}=require("../controllers/answer");
const {checkQuestionAndAnswerExist} =require("../middleware/database/databaseErrorHelpers");
const {getAnswerOwnerAccess}=require("../middleware/authorization/auth");
// mergeParams => bir üst route taki paramsları alt router geçmesini sağlıyor
const router=express.Router({mergeParams:true});


router.post("/",getAccessToRoute,addNewAnswerToQuestion);
router.get("/",getAccessToRoute,getAllAnswersByQuestion);
router.get("/:answer_id",checkQuestionAndAnswerExist,getSingleAnswer)
router.get("/:answer_id/like",[checkQuestionAndAnswerExist,getAccessToRoute],likeAnswer)
router.get("/:answer_id/undolike",[checkQuestionAndAnswerExist,getAccessToRoute],undoLikeAnswer)
router.put("/:answer_id/edit",[checkQuestionAndAnswerExist,getAccessToRoute,getAnswerOwnerAccess],editAnswwer)
router.delete("/:answer_id/delete",[checkQuestionAndAnswerExist,getAccessToRoute,getAnswerOwnerAccess],deleteAnswwer)

module.exports=router;