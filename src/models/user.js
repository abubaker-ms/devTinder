const mongoose=require("mongoose")

const {Schema}=mongoose

const userSchema=new Schema({
    firstName: String,
    lastName: String,
    age:Number,
    emailId:String,
    password:String,
    gender:String
})

const User=mongoose.model('User',userSchema)

module.exports=User