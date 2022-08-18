const express =require("express");
const {getSingleQuestion, getAllQuestions,askNewQuestion,editQuestion}=require("../controllers/question"); 
const {checkQuestionExist}=require("../middleware/database/databaseErrorHelpers");
const {getAccessToRoute,getQuestionOwnerAccess}=require("../middleware/authorization/auth");

//api/question
const router=express.Router();

router.get("/",getAllQuestions);
router.get("/:id",checkQuestionExist, getSingleQuestion);
router.post("/ask", getAccessToRoute,askNewQuestion);
router.put("/:id/edit",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],editQuestion)




module.exports=router;