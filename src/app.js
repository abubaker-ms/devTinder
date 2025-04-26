const express=require("express")
const app=express()
const connectDB=require('./config/database')
const User=require('./models/user')
const validateSignup=require('./ultils/validation')
const bcrypt = require('bcrypt');

app.use(express.json());

//get user by email
app.get('/user',async(req,res)=>{
    const emailId=req.body.emailId
    try{
        const user=await User.find({emailId:emailId})
        console.log(user)
    }
    catch(err){
        console.log(err)    
    }
})

// get all user details , to show in the feed
app.get('/feed',async(req,res)=>{
    
    try{
        const user= await User.find()
        if(user){
            res.json(user)
        }
        else{
            res.status(404).send('User not found')
        }
    }
    catch(err){
        console.log(err)
    }
})

app.post('/signIn',async(req,res)=>{
    const {emailId,password}=req.body
    // check if email exists
    const isUser= await User.findOne({emailId})

        try{
            if(!isUser){
                throw new Error('Invalid Credentials')
            }
    
            // decrypt password
            const DBpassword=isUser.password
            console.log(isUser)

            const isPasswordValid= await bcrypt.compare(password,DBpassword)
            if(!isPasswordValid){
                throw new Error('Invalid Credentials')
            }
    
            res.send("login success")
        }
        catch(err){
            res.send(err.message)
        }
 
    
})

app.post('/signup', async (req,res)=>{

    //creating instance of schema
    const {password,firstName,lastName,emailId}=req.body
    
    try{

        const hashPassword=await bcrypt.hash(password,10)
        validateSignup(req.body);
        const user=new User({
            firstName,
            lastName,
            password:hashPassword,
            emailId
        })

        await user.save()
        res.send("signup success")

    }
    catch(err){
        console.log(err)
        res.send(err.message)
    }
})

// update emailId
app.put('/user/:userid',async (req,res)=>{
    const userId=req.params?.userId
    const data=req.body
    console.log(data)
 
    
    
    try{
        const allowedUpdates=["password","about","photoUrl","skills","lastName"];
        const isupdatedAllowed=Object.keys(data).every((k)=>{
           return allowedUpdates.includes(k)
        })

         
        console.log(isupdatedAllowed)
        if(!isupdatedAllowed){
            throw new Error("Update not allowed")
        }
        const result=await User.findOneAndUpdate(
            userId,
            data,
            {
                runValidators:true
            }
        )
        res.send("successfully updated",result) 
    }
    catch(err){
        console.log(err)
        res.send(err.message)
    }
})

//Delete user

app.delete('/deleteuser',async (req,res)=>{
    console.log(req.body)
    const userId=req.body.userId
    try{
        const deleted=  await User.findByIdAndDelete(userId)
        console.log(deleted)
        res.send("deleted sucessfully")
    }
    catch(err){
        res.send(err)
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

