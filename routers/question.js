const express =require("express");
const {getAllQuestions}=require("../controllers/question"); 

//api/question
const router=express.Router();

router.get("/",getAllQuestions);


module.exports=router;