const express=require("express");
const {getAccessToRoute}=require("../middleware/authorization/auth");
const {addNewAnswerToQuestion,getAllAnswersByQuestion,getSingleAnswer}=require("../controllers/answer");
const {checkQuestionAndAnswerExist} =require("../middleware/database/databaseErrorHelpers");
// mergeParams => bir üst route taki paramsları alt router geçmesini sağlıyor
const router=express.Router({mergeParams:true});


router.post("/",getAccessToRoute,addNewAnswerToQuestion);
router.get("/",getAccessToRoute,getAllAnswersByQuestion);
router.get("/:answer_id",checkQuestionAndAnswerExist,getSingleAnswer)

module.exports=router;