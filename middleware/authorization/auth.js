const CustomError=require("../../helpers/error/CustomError");
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

module.exports={
    getAccessToRoute
}