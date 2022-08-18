const CustomError=require("../../helpers/error/CustomError");
const asyncErrorWapper=require("express-async-handler");
const User=require("../../models/User");
const Question=require("../../models/Question");
const {isTokenIncluded, getAccessTokenFromHeader}=require("../../helpers/authorization/tokenHelpers");
const jwt=require("jsonwebtoken");

const getAccessToRoute=(req,res,next)=>{
    //Token
    const {JWT_SECRET_KEY}=process.env;

    if(!isTokenIncluded(req))
    {
        //401,403
        //401 Unauthorized
        //403 Forbitten
        console.log("isTokenIncluded");
        return next(new CustomError("You are not authrized to access this route",401))
    }

    const access_token=getAccessTokenFromHeader(req);
    
    jwt.verify(access_token,JWT_SECRET_KEY,(err,decoded)=>{
        if(err)
        {
            return next(new CustomError("JWT verity : You are not authorized to access this route",401));
        }
        req.user={
            id:decoded.id,
            name:decoded.name
        }
        next();
    });


    //CustomError

}
const getAdminAccess=asyncErrorWapper(async(req,res,next)=>{
    const {id}=req.user;

    const user=await User.findById(id);
    if(user.role!=="admin")
    {
        return next(new CustomError("Only admins can access this route",403));
    }
    next();
});
const getQuestionOwnerAccess=asyncErrorWapper(async(req,res,next)=>{
    const id=req.user.id;
    const questionId=req.params.id;

    const question=await Question.findById(questionId);

    if(question.user!=userId)
    {
        return next(new CustomError("Only owner can handle this operation",403));
    }
    next();
});

module.exports={
    getAccessToRoute,
    getAdminAccess,
    getQuestionOwnerAccess
};