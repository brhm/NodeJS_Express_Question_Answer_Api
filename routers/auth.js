const express =require("express");
const {register,getUser,errorTest, tokentest, login,logout,imageUpload}=require("../controllers/auth");
const {getAccessToRoute}=require("../middleware/authorization/auth");
const profileImageUpload=require("../middleware/libraries/profileImageUpload");



//api/auth
const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",getAccessToRoute,logout);
router.get("/profile",getAccessToRoute,getUser);
router.post("/upload",[getAccessToRoute,profileImageUpload.single("profile_image")],imageUpload);
router.post("/tokentest",getAccessToRoute,tokentest);
router.get("/error",errorTest);


module.exports=router;