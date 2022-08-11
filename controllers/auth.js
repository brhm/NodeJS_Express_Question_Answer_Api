const register=(req,res,next)=>{

    res.status(200)
    .json({
        success:true,
        body:"Auth register page"
    })
};

module.exports={
    register
}