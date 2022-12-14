const express=require("express")
const dotenv=require("dotenv");
const connectDatabase=require("./helpers/database/connectDatabase");
const customErrorHandler=require("./middleware/errors/customErrorHandler");
const { application } = require("express");
const path=require("path");// Static dosyaları göstermek için kullanacağımız express kütüphanesi

const routers = require("./routers");//./routers/index.js=./routers



// Enviroment Variables
dotenv.config({
    path:"./config/env/config.env"
});

// MongoDb Connection
connectDatabase();


const app=express()

// Express - Body Middleware 
app.use(express.json());

const PORT=process.env.PORT;

//Routers Middleware
app.use("/api",routers);

// Error Handler
app.use(customErrorHandler);

// Static files
app.use(express.static(path.join(__dirname,"public")));// static dosyların youlu express e tanıtıyoruz.

app.listen(PORT,()=>{
    console.log(`App Started on ${PORT} : ${process.env.NODE_ENV}`);
})
