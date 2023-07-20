const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,lowercase:true},
    password:{type:String,required:true},
    age:{type:Number,required:true},
    gender:{type:String,required:true},
    subscription: { type: Boolean, default: false }
},{versionKey:false})
const userModel=mongoose.model("user",userSchema)
module.exports={userModel}
