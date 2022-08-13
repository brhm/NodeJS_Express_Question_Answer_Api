const User=require("../models/User");
const CustomError=require("../helpers/error/CustomError");
const asyncErrorWrapper=require("express-async-handler"); // bu asynchandler sayesinde try catch leri kullanmadan hataları Custom Error Handlera yönlendirilmesini sağlıyoruz.

const register= asyncErrorWrapper (async(req,res,next)=>{
    // post data 

    const name="medya keskin";
    const email="medyaydin@gmail.com";
    const password="123qwe";

    // async ,await  -- Async methotlarda hataları yakalamak için try catch kullanmalıyız.

    const user= await User.create({
        name,
        email,
        password
    });

    res.status(200)
    .json({
        success:true,
        data:user
    })

});

const errorTest=(req,res,next)=>
{
    //some code
    // Question Does Not Exist

    return next(new CustomError("Custom Error Message",400));
};
module.exports={
    register,
    errorTest
}