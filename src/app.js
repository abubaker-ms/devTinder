const express=require("express")
const app=express()
const connectDB=require('./config/database')
const User=require('./models/user')

app.post('/signup', async (req,res)=>{
    //creating instance of schema
    const user =new User({
        firstName:"Umar",
        lastName:"M S",
        age:"31",
        email:"umar@gmail.com",
        password:"umar123"
    })
    await user.save()
    try{
        res.send("signup success")

    }
    catch(err){
        console.log(err)
    }
})
connectDB().then(()=>{
    console.log("DB connected sucessfully");
    app.listen(3000,()=>{
        console.log("lisnening to the port 3000");
    })
})
.catch((err)=>{
    console.log(err)
})

