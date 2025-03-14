require('dotenv').config();


const express=require('express');
const cors=require('cors');
const connectDB=require("./src/config/database")
const app=express();
const cookieParser=require("cookie-parser");

const authRouter  = require('./src/routes/auth');
const  profileRouter = require('./src/routes/profile');
const  requestRouter  = require('./src/routes/request');
const userRouter= require('./src/routes/user');
const paymentRouter = require('./src/routes/payment');



const allowedOrigins = [  
  "http://localhost:5173", // Local frontend  
  "https://sweet-souffle-755dc7.netlify.app/" // Replace with your deployed frontend URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());
app.use(cookieParser())

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)
app.use("/",paymentRouter)
app.get("/",(req,res)=>{
  res.send("APi is running ")
})
connectDB().then(()=>{
  console.log("Database connected")
  
  app.listen(process.env.PORT,()=>{
    console.log('Server is running on port 7777');
    })
}).catch(err=>{
  console.log("Error in connecting database",err)
})
