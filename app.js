const express=require('express');
const cors=require('cors');
const connectDB=require("./src/config/database")
const app=express();
const cookieParser=require("cookie-parser");

const authRouter  = require('./src/routes/auth');
const  profileRouter = require('./src/routes/profile');
const  requestRouter  = require('./src/routes/request');
const userRouter= require('./src/routes/user')


app.use(cors({
  origin: "https://devtinder-web-project.vercel.app", // ✅ Allow frontend domain
  credentials: true, // ✅ Required to allow cookies in browser
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"], // ✅ Allow Authorization header
}));
app.use(express.json());
app.use(cookieParser())

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
