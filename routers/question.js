const express =require("express");
const {getSingleQuestion, getAllQuestions,askNewQuestion}=require("../controllers/question"); 
const {checkQuestionExist}=require("../middleware/database/databaseErrorHelpers");
const {getAccessToRoute}=require("../middleware/authorization/auth");

//api/question
const router=express.Router();

router.get("/",getAllQuestions);
router.get("/:id",checkQuestionExist, getSingleQuestion);
router.post("/ask", getAccessToRoute,askNewQuestion);



module.exports=router;