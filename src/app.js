const express=require('express');
const cors=require('cors');
const connectDB=require("./config/database")
const app=express();
const cookie=require("cookie-parser");

const authRouter  = require('./routes/auth');
const  profileRouter = require('./routes/profile');
const  requestRouter  = require('./routes/request');
const userRouter= require('./routes/user')
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json());
app.use(cookie())

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)
app.get("/",(req,res)=>{
  res.send("APi is running ")
})
connectDB().then(()=>{
  console.log("Database connected")
  app.listen(7777,()=>{
    console.log('Server is running on port 7777');
    })
}).catch(err=>{
  console.log("Error in connecting database",err)
})
