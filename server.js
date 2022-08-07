const express=require("express")
const dotenv=require("dotenv");

const app=express()

// Enviroment Variables

dotenv.config({
    path:"./config/env/config.env"
});

const PORT=process.env.PORT;




app.get("/",(req,res,next)=>{
    res.send("Hello Question Answer Api - ibrahim");
    next();
});
app.listen(PORT,()=>{
    console.log(`App Started on ${PORT} : ${process.env.NODE_ENV}`);
})
