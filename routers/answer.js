const express=require("express");

// mergeParams => bir üst route taki paramsları alt router geçmesini sağlıyor
const router=express.Router({mergeParams:true});


router.get("/",(req,res,next)=>{
    console.log(req.params); // mergeParams=true olmaz ise boş gelir.
    console.log("Answer route");
   res.send("Answer Route");
})

module.exports=router;