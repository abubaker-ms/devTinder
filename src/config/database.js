const mongoose=require('mongoose')

const connectDB=async()=>{
    await mongoose.connect(
        "mongodb+srv://msabubaker1:QPA6Eks5dGaOgP1C@nodejs.hf7pe64.mongodb.net/devTinder"
    )
}

module.exports=connectDB


