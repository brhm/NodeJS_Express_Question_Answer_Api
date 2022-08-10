const express =require("express");

//api/question
const router=express.Router();

router.get("/",(req,res)=>{

    res.send("Question Home Page 01");
});

router.get("/delete",(req,res)=>{

    res.send("Question Delete Page");
});

module.exports=router;