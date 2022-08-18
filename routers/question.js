const express =require("express");
const {getSingleQuestion, getAllQuestions,askNewQuestion,editQuestion,deleteQuestion,likeQuestion,undoLikeQuestion}=require("../controllers/question"); 
const {checkQuestionExist}=require("../middleware/database/databaseErrorHelpers");
const {getAccessToRoute,getQuestionOwnerAccess}=require("../middleware/authorization/auth");

//api/question
const router=express.Router();

router.get("/",getAllQuestions);
router.get("/:id",checkQuestionExist, getSingleQuestion);
router.post("/ask", getAccessToRoute,askNewQuestion);
router.put("/:id/edit",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],editQuestion)
router.delete("/:id/delete",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],deleteQuestion)
router.get("/:id/like",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],likeQuestion)
router.get("/:id/undolike",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],undoLikeQuestion)




module.exports=router;