const User=require("../models/User");
const CustomError =require("../helpers/error/CustomError");
const asyncErrorWapper=require("express-async-handler");

const blockUser=asyncErrorWapper(async(req,res,next)=>{

    const {id}=req.params;

    const user=await User.findById(id);
    user.blocked=!user.blocked;

    await user.save();

    return res.status(200).json({
        success:true,
        message:"Block - UnBlock is successfull"
            });
        });

module.exports={
    blockUser
}