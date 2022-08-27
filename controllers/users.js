const User=require("../models/User");
const CustomError=require("../helpers/error/CustomError");
const asyncErrorWrapper=require("express-async-handler"); // bu asynchandler sayesinde try catch leri kullanmadan hataları Custom Error Handlera yönlendirilmesini sağlıyoruz.


const getSingleUser= asyncErrorWrapper(async(req,res,next)=>{

    const {id}=req.params;
    
    const user=await User.findById(id);
   
    return res.status(200)
    .json({
        success:true,
        data:user
    });

});
const getAllUsers=asyncErrorWrapper(async(req,res,next)=>{
    console.log("getallusers");
    return res.status(200)
    .json(res.queryResults);
});

module.exports={getSingleUser,getAllUsers};