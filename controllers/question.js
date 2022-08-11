const getAllQuestions=(req,res,next)=>{

    res.status(200)
    .json({
        success:true,
        body:"All Questions"
    });
};

module.exports={
    getAllQuestions
}