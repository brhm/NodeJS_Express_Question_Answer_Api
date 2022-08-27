const asyncErrorHandler=require("express-async-handler");
const { searchHelper,paginationHelper } = require("./queryMiddlewareHelpers");

const answerQueryMiddleware=function(model,options){

    return asyncErrorHandler(async function(req,res,next){
       
        const {id}=req.params;
        const arrayName="answers";

        const total=(await model.findById(id))["answerCount"];
        
        console.log("answerQueryMiddleware : "+total);
       
        //pagination
        
        const paginationResult=await paginationHelper(total,undefined,req);
        const startIndex=paginationResult.startIndex;
        const limit=paginationResult.limit;
        
        // 2 3 4 
        let queryObject={};
        queryObject[arrayName]={$slice:[startIndex,limit]}; // mongoose ve mongo documanlarında detayına bakılabilir.

        let query=model.find({_id:id},queryObject); 
        const queryResults=await query;

        res.queryResults={
            success:true,
            count:queryResults.length,
            pagination:paginationResult.pagination,
            data:queryResults
        };
      
        next()
    });
};

module.exports=answerQueryMiddleware;

