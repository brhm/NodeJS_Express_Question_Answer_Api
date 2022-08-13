const mongoose=require("mongoose");
var bcrypt = require('bcryptjs');
const { json } = require("express");
const jwt=require("jsonwebtoken");

const Schema=mongoose.Schema;

const UserSchema=new Schema({
    name:{
        type:String,
        required:[true,"Please provide a name"]
    },
    email:{
        type:String,
        required:[true,"Please Provide Email"],
        unique:true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
            'Please fill a valid email address'
        ]       
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    password:{
        type:String,
        minlength:[6,"Please provide a password with min length 6"],
        required:[true,"Please provide a password"],
        select:false // şifresnin gösterilmemesi için
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    title:{
        type:String
    },
    about:{
        type:String
    },
    place:{
        type:String
    },
    website:{
        type:String
    },
    profil_image:{
        type:String,
        default:"default.jpg"
    },
    blocked:{
        type:Boolean,
        default:false
    }
});

// UserSchema  Methods
UserSchema.methods.generateJwtFromUser=function(){
    const {JWT_SECRET_KEY,JWT_EXPIRE}=process.env;

    const payload={
        id:this._id,
        name:this.name
    }
    const token=jwt.sign(payload,JWT_SECRET_KEY,{
        expiresIn:JWT_EXPIRE
    });
    return token;
}

// mongoose hooks ile kayıt işleminden hemen önce aşağıdaki per ile araya giriyoruz. mongoose middleware pre.
// Pre hooks
UserSchema.pre("save",function(next){

    console.log("Pre hooks : Save");
    console.log(this);
    console.log(this.password);
// Parola Değişmediyse
    if(!this.isModified("password")){
        next();
    }

    bcrypt.genSalt(10, (err, salt) =>{
        if(err) next(err);
        bcrypt.hash(this.password, salt, (err, hash) =>
         {   // Store hash in your password DB.
            if(err)
            next(err);
            this.password=hash;
            next();
        });
    });    
});
module.exports=mongoose.model("User",UserSchema);
//users 

//user.create