const express =require("express");
const {getAllQuestions,askNewQuestion}=require("../controllers/question"); 

const {getAccessToRoute}=require("../middleware/authorization/auth");

//api/question
const router=express.Router();

router.get("/",getAllQuestions);

router.post("/ask", getAccessToRoute,askNewQuestion);


module.exports=router;