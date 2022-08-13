const express =require("express");
const {register,errorTest, tokentest}=require("../controllers/auth");
const {getAccessToRoute}=require("../middleware/authorization/auth");



//api/auth
const router=express.Router();

router.post("/register",register);
router.post("/tokentest",getAccessToRoute,tokentest);
router.get("/error",errorTest);


module.exports=router;