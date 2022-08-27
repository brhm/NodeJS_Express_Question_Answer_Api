const asyncErrorHandler=require("express-async-handler");
const { searchHelper,paginationHelper } = require("./queryMiddlewareHelpers");

const userQueryMiddleware=function(model,options){

    return asyncErrorHandler(async function(req,res,next){
        // Initial User
        let query=model.find();
        console.log("middleware search : "+req.search);
        // Search 
        query=searchHelper("name",query,req);

        //pagination
        const paginationResult=await paginationHelper(model,query,req);
        
        query=paginationResult.query;
        const pagination=paginationResult.pagination;
        const queryResults=await query;

        res.queryResults={
            success:true,
            count:queryResults.length,
            pagination:pagination,
            data:queryResults
        };
      
        next()
    });
};

module.exports=userQueryMiddleware;

