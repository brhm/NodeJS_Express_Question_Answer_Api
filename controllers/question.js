const Question =require("../models/Question");
const CustomError=require("../helpers/error/CustomError");
const asyncErrorHandler =require("express-async-handler");

const askNewQuestion=asyncErrorHandler(async(req,res,next)=>{

    const information=req.body;
    const question=await Question.create({
        ...information, // information içindeki parametreleri ... ile question alanlarına eşliyor
        user:req.user.id
    });

    res.status(200)
    .json({
        success:true,
        data:question
    })
});

const getAllQuestions=asyncErrorHandler(async(req,res,next)=>{

    //console.log(req.query.search);
    let query=Question.find();
    const populate=true;
    const populateValue="user";
    const populateObject={
        path:"user",
        select:"name profil_image"
    };
    
    //search
    if(req.query.search)
    {
        const searchObject={};

        const regex=new RegExp(req.query.search,"i");// i => büyük harf küçük harf getir
        searchObject["title"]=regex;
        //searchObject["title","content"]=regex;
        query=query.where(searchObject);    
    }
    //populate
    if(populate)// şimdilik değerleri yukarıda statik verdik.
    {
        //query=query.populate(populateValue);
        query=query.populate(populateObject);
    }

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
    const total=await Question.countDocuments();
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
    query=query.skip(startIndex).limit(limit);

    // sort : req.query.sortBy most-answered most-liked
    const sortKey=req.query.sortBy;
    if(sortKey==="most-answered")
    {
        query=query.sort("-answerCount -createdAt");
    }
    else if(sortKey==="most-liked")
    {
        query=query.sort("-likeCount");
    }else{
        query=query.sort("-createdAt -createdAt");
    }
    
    const questions=await query;
   
   /* const questions=await Question.find().where({
        title:"Title 1"
    });
    */
    res.status(200)
    .json({
        success:true,
        count:questions.length,
        pagination:pagination,
        data:questions
    });
});

const getSingleQuestion=asyncErrorHandler(async(req,res,next)=>{

    const {id}=req.params;

    const question=await Question.findById(id);

    return res.status(200)
    .json({
        success:true,
        data:question
    });
});

const editQuestion=asyncErrorHandler(async(req,res,next)=>{

    const {id}=req.params;
    const {title,content}=req.body;
    console.log("title:" +title);
    console.log("id:"+ id);
    let question=await Question.findById(id);
    question.title=title;
    question.content=content;

    question=await question.save();

    return res.status(200)
    .json({
        success:true,
        data:question
    });    
});

const deleteQuestion=asyncErrorHandler(async(req,res,next)=>{
    const {id}=req.params;

    await Question.findByIdAndDelete(id);

    return res.status(200)
    .json({
        success:true,
        data:"Question delete operation is successful"
    }); 
});

const likeQuestion=asyncErrorHandler(async(req,res,next)=>{
    const {id}=req.params;

    const question=await Question.findById(id);
    
    //like etmişse
    if(question.likes.includes(req.user.id))
    {
        return next(new CustomError("You already liked this question",400));
    }

    question.likes.push(req.user.id);
    question.likeCount=question.likes.length;

    await question.save();

    return res.status(200)
    .json({
        success:true,
        data:question
    })
});

const undoLikeQuestion=asyncErrorHandler(async(req,res,next)=>{
    const {id}=req.params;

    const question=await Question.findById(id);
    
    //like etmişse
    if(!question.likes.includes(req.user.id))
    {
        return next(new CustomError("You can't undo like operation for this question",400));
    }

    const index=question.likes.indexOf(req.user.id);
    question.likes.splice(index,1);    
    question.likeCount=question.likes.length;
    await question.save();

    return res.status(200)
    .json({
        success:true,
        data:question
    })
});

module.exports={
    getAllQuestions,
    askNewQuestion,
    getSingleQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion,
    undoLikeQuestion
}