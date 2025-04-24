const express=require("express")
const app=express()
const connectDB=require('./config/database')
const User=require('./models/user')

app.use(express.json());

app.post('/signup', async (req,res)=>{
    //creating instance of schema

    const user=new User(req.body)
    
    try{
        await user.save()
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

