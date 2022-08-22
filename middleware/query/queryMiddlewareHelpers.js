const searchHelper=(searchKey,query,req)=>{

    console.log("searchHelper ")
     //search
     if(req.query.search)
     {
         const searchObject={};
 
         const regex=new RegExp(req.query.search,"i");// i => büyük harf küçük harf getir
         searchObject[searchKey]=regex;
         //searchObject["title","content"]=regex;
         return query.where(searchObject);    
     }
     return query;
};

const populateHelper=(query,population)=>{
    
    console.log("populateHelper ")
 return query.populate(population);
};

const questionSortHelper=(query,req)=>{

    
    console.log("questionSortHelper ")
    const sortKey=req.query.sortBy;
    if(sortKey==="most-answered")
    {
        return query.sort("-answerCount");
    }
    else if(sortKey==="most-liked")
    {
        return query.sort("-likeCount");
    }else{
        return query.sort("-createdAt");
    }
};

const paginationHelper=async(model,query,req)=>{

    console.log("paginationHelper ")
         //pagination
    const page=parseInt(req.query.page)||1;
    const limit=parseInt(req.query.limit)||5;
    // 1 2 3 4 5 6 7 8 9 10 - 10 tane
    // page 1, limit =5 => startIndex=0 endIndex=5
    //skip(2)
    //limit(2)
    const startIndex=(page-1)*limit;
    const endIndex=page*limit;

    const pagination={};
    const total=await model.countDocuments();
    if(startIndex>0)
    {
        pagination.previoues={
            page:page-1,
            limit:limit
        }
    }
    if(endIndex<total)
    {
        pagination.next={
            page:page+1,
            limit:limit
        }
    }
    return {
        query:query.skip(startIndex).limit(limit),
        pagination:pagination
    }
};

module.exports={
    searchHelper,
    populateHelper,
    questionSortHelper,
    paginationHelper
}