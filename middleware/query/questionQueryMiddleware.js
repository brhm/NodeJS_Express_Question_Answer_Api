const asyncErrorHandler=require("express-async-handler");
const { searchHelper,populateHelper,questionSortHelper,paginationHelper } = require("./queryMiddlewareHelpers");

const questionQueryMiddleware=function(model,options){

    return asyncErrorHandler(async function(req,res,next){
        // Initial Query
        let query=model.find();
        console.log("middleware search")
        // Search 
        query=searchHelper("title",query,req);

        // populate
        if(options&& options.population)
        {
            
        console.log("middleware populate");
            query=populateHelper(query,options.population)
        }

        console.log("middleware sort");
        //sort 
        query=questionSortHelper(query,req);

        
        console.log("middleware pagination");
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

module.exports=questionQueryMiddleware;