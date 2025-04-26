const mongoose=require("mongoose")
const validator=require("validator")
const {Schema}=mongoose

const userSchema=new Schema({
    firstName: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minlength:3,
        maxlength:50
    },
    lastName: String,
    age:{
        type:String,
        min:15,
      
    },
    emailId:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("EmailId is not correct")
            }           
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong")
            }           
        }
    },

    about:{
        type:String,
        default:"This is default value for about"
    },
    photoUrl:{
        type:String,
        default:"https://www.freepik.com/free-photos-vectors/default-user",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Photo URL is not correct")
            }           
        }
    },
    skills:{
        type:[String]
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid");
            }
        }
    }
},{
    timestamps:true
})

const User=mongoose.model('User',userSchema)

module.exports=User