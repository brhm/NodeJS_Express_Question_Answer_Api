const User=require("../models/User");
const CustomError=require("../helpers/error/CustomError");
const { JsonWebTokenError } = require("jsonwebtoken");
const {sendJwtToClient}=require("../helpers/authorization/tokenHelpers");
const {validateUserInput, comparePassword}=require("../helpers/input/inputHelpers");
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


const login=asyncErrorWrapper(async(req,res,next)=>{

    const {email,password}=req.body;

    if(!validateUserInput(email,password))
    {
        return next(new CustomError("Please check your inputs",400));
    }

    const user= await User.findOne({email}).select("+password"); // user clası oluşturduğumuzda password alanının select değerini false yaptık bu yüzden normal sorguda password sorga gelmez. gelmesini sağlamak için sorguya select eklememiz gerekiyor.
    
    if(!comparePassword(password,user.password))
    {
        return next(new CustomError("Please check your credentials",400));
    }
    sendJwtToClient(user,res);
   
});

const logout=asyncErrorWrapper(async(req,res,next)=>{

   const {NODE_ENC}=process.env;

   return res.status(200)
   .cookie({
    httpOnly:true,
    expires:new Date(Date.now()),
    secure:NODE_ENC==="development"?false:true
   }).json({
    success:true,
    message:"Logout Successfull"
   })
   
});
//Forgot password
const forgotpassword=asyncErrorWrapper(async(req,res,next)=>{
    const resetEmail=req.body.email;

    const user= await User.findOne({email:resetEmail});
    if(!user)
    {
        return next(new CustomError("There is no user with that email",400));
    }
    const resetPasswordToken=user.getResetPasswordTokenFromUser();

    await user.save();
    
    res.status(200).json({
        success:true,
        message:"Token Sent to Your Email"
    })

})

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

const imageUpload=asyncErrorWrapper(async(req,res,next)=>{

   // image upload success

   const user=await User.findByIdAndUpdate(req.user.id,{
    "profil_image":req.savedProfileImage
   },{
    new:true, // güncellenmemiş user almak için new true dememiz gerekiyor.
    runValidators:true
   });

   return res.status(200)
   .json({
    success:true,
    message:"Image Upload Success",
    data:user
   });    
 });

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
    login,
    logout,
    imageUpload,
    forgotpassword,
    errorTest,
    tokentest
}