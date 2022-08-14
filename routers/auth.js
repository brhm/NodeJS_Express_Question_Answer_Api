const express =require("express");
const {register,getUser,errorTest, tokentest, login,logout}=require("../controllers/auth");
const {getAccessToRoute}=require("../middleware/authorization/auth");



//api/auth
const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",getAccessToRoute,logout);
router.get("/profile",getAccessToRoute,getUser);
router.post("/tokentest",getAccessToRoute,tokentest);
router.get("/error",errorTest);


module.exports=router;