const User=require("../models/User");
const CustomError=require("../helpers/error/CustomError");

const register=async (req,res,next)=>{
    // post data 

    const name="medya keskin";
    const email="medyaydin@gmail.com";
    const password="123qwe";

    // async ,await  -- Async methotlarda hataları yakalamak için try catch kullanmalıyız.
try{
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
}catch(err){
    return next(err);
    
}
};

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