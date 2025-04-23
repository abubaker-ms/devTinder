const express=require("express")
const app=express()


app.use('/',(req,res,next)=>{
    let token=true
    if(!token){
        res.send("error")
    }else{
        next()
    }   
})

app.get("/users",(req,res)=>{
    console.log(req.query)
    res.send("Hello from the server")
})
app.get("/users/userdetail",(req,res)=>{
    res.send("user details")
})
app.listen(3000,()=>{
    console.log("lisnening to the port 3000")
})