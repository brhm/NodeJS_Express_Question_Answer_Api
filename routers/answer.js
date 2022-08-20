const express=require("express");
const {getAccessToRoute}=require("../middleware/authorization/auth");
const {addNewAnswerToQuestion,getAllAnswersByQuestion}=require("../controllers/answer");
// mergeParams => bir üst route taki paramsları alt router geçmesini sağlıyor
const router=express.Router({mergeParams:true});


router.post("/",getAccessToRoute,addNewAnswerToQuestion);
router.get("/",getAccessToRoute,getAllAnswersByQuestion);

module.exports=router;