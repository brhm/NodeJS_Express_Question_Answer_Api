const express =require("express");

//api/question
const router=express.Router();

router.get("/",(req,res)=>{

    res.
    status(200)
    .json({
        success:true
    });
});

router.get("/delete",(req,res)=>{

    res.send("Question Delete Page");
});

module.exports=router;