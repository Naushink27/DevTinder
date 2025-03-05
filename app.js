const express=require('express');
const cors=require('cors');
const connectDB=require("./src/config/database")
const app=express();
const cookie=require("cookie-parser");

const authRouter  = require('./src/routes/auth');
const  profileRouter = require('./src/routes/profile');
const  requestRouter  = require('./src/routes/request');
const userRouter= require('./src/routes/user')
app.use(cors({
  origin:"https://sweet-souffle-755dc7.netlify.app",
  credentials:true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allow PATCH
    allowedHeaders: ["Content-Type", "Authorization"],
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
