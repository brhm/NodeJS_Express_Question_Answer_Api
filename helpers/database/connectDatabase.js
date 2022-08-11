const mongoose=require("mongoose");

const connectDatabase=()=>{
   /** 
            useFindAndModify:false,
            useCreateIndex:true,
            useUnifiedTopology:true */
    mongoose.connect(process.env.MONGO_URI,
        {
            useNewUrlParser:true
        })
    .then(()=>{
        console.log("MongoDb Connection Successful");
    }).catch(err=>{
        console.error(err);
    });
}

module.exports=connectDatabase;