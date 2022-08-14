const User=require("../models/User");
const CustomError=require("../helpers/error/CustomError");
const { JsonWebTokenError } = require("jsonwebtoken");
const {sendJwtToClient}=require("../helpers/authorization/tokenHelpers");
const asyncErrorWrapper=require("express-async-handler"); // bu asynchandler sayesinde try catch leri kullanmadan hataları Custom Error Handlera yönlendirilmesini sağlıyoruz.


const register= asyncErrorWrapper (async(req,res,next)=>{
    //Post Data
    // Note : async ,await  -- Async methotlarda hataları yakalamak için try catch kullanmalıyız.  express-async-handler sayesinde try catch kullanmamıza gerek kalmadı
    console.log(req.body)

    const{name,email,password,role}=req.body;

    const user= await User.create({
        name,
        email,
        password,
        role
    });

    sendJwtToClient(user,res);

});

const getUser=(req,res,next)=>
{
    res.json({
        success:true,
        data:{
            id:req.user.id,
            name:req.user.name
        }
    })    
};


const tokentest=(req,res,next)=>
{
    res.json({
        success:true,
        message:"Welcame"
    })    
};

const errorTest=(req,res,next)=>
{
    //some code
    // Question Does Not Exist

    return next(new CustomError("Custom Error Message",400));
};
module.exports={
    register,
    getUser,
    errorTest,
    tokentest
}