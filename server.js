const express=require("express")

const app=express()

const PORT=5000||process.env.PORT;

app.get("/",(req,res,next)=>{
    res.send("Hello Question Answer Api - ibrahim");
    next();
});
app.listen(PORT,()=>{
    console.log(`App Started on ${PORT}`);
})
