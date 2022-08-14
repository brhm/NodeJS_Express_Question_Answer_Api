const express=require("express");
const {getSingleUser,getAllUsers}=require("../controllers/users");
const {checkUserExist}=require("../middleware/database/databaseErrorHelpers");


const router=express.Router();

router.get("/",getAllUsers);
router.get("/:id",checkUserExist, getSingleUser);

module.exports=router;