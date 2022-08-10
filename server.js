const express=require("express")
const dotenv=require("dotenv");

const { application } = require("express");
const routers = require("./routers");//./routers/index.js=./routers

const app=express()




// Enviroment Variables
dotenv.config({
    path:"./config/env/config.env"
});

const PORT=process.env.PORT;

//Routers Middleware

app.use("/api",routers);


app.listen(PORT,()=>{
    console.log(`App Started on ${PORT} : ${process.env.NODE_ENV}`);
})
