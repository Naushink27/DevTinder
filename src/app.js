const express=require('express');
const connectDB=require("./config/database")
const app=express();
const User=require('./models/user');

app.post('/signup',async(req,res)=>{
  //Creating new instance of the User model.
    const user=new User({
      firstName:"Suzain",
      lastName:"Khan",
      email:"suzain@khan.com",
      password:"Khan@123",
    })
    //Saving the user to the database.
    try{
      await user.save();
      res.send("User created successfully")
    }
    catch(err){
      res.status(500).send("Server error")
    }
   
})
connectDB().then(()=>{
  console.log("Database connected")
  app.listen(7777,()=>{
    console.log('Server is running on port 7777');
    })
}).catch(err=>{
  console.log("Error in connecting database",err)
})
