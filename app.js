require('dotenv').config();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // Load .env only in development
}



const express=require('express');
const cors=require('cors');
const http=require('http')
const connectDB=require("./src/config/database")
const app=express();
const cookieParser=require("cookie-parser");
const initializeSocket=require("./src/utils/initializeSocket")
const authRouter  = require('./src/routes/auth');
const  profileRouter = require('./src/routes/profile');
const  requestRouter  = require('./src/routes/request');
const userRouter= require('./src/routes/user');
const chatRouter= require('./src/routes/chat');
const paymentRouter = require('./src/routes/payment');




const allowedOrigins = [  
  "http://localhost:5173",  
  "https://zippy-bubblegum-058e76.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // ✅ Required for cookies/sessions
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(express.json());  // ✅ Then parse JSON  
app.use(cookieParser());
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
});


app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)
app.use("/",paymentRouter)
app.use("/",chatRouter)
app.get("/",(req,res)=>{
  res.send("APi is running ")
})

const server=http.createServer(app);
initializeSocket(server)
connectDB().then(()=>{
  console.log("Database connected")
  
  server.listen(process.env.PORT,()=>{
    console.log('Server is running on port 7777');
    })
}).catch(err=>{
  console.log("Error in connecting database",err)
})
