const express =require("express");
const {getAccessToRoute,getAdminAccess}=require("../middleware/authorization/auth");

const {blockUser}=require("../controllers/admin");
const { checkUserExist } = require("../middleware/database/databaseErrorHelpers");
// Block user
// Delete user
//api/admin
const router=express.Router();

router.use([getAccessToRoute,getAdminAccess]);

router.get("/block/:id",checkUserExist,blockUser);

module.exports=router;