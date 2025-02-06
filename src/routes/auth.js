const express = require('express')
const authRouter=express.Router();
const User= require("../models/user")
const bcrypt= require('bcrypt');
const validateSignup=require('../utils/validate')


authRouter.post('/signup',async(req,res)=>{
    try{
     //Validate the data before creating a user.
      validateSignup(req);
  
     //Encrypt the password.
     const {firstName,lastName,email}= req.body;
     const password=req.body.password;
     const hashedPassword= await bcrypt.hash(password,10);
    
      
    //Creating new instance of the User model.
  
      const user=new User({
        firstName,
        lastName,
        email,
        password:hashedPassword
      });
      //Saving the user to the database.
     
        
        await user.save();
        res.send("User created successfully")
        
      }
      catch(err){
        res.status(500).send("ERROR: "+" "+err)
      }
     
  })
authRouter.post("/login",async(req,res)=>{
    try{
      const {email,password}=req.body;
      if(!email || !password){
        throw new Error("Email and password are required")
      }
      const user= await User.findOne({email:email});
     console.log(user)
      if(!user){
        throw new Error("invalid Credentials!!");
      }
    const isPassword=await  user.validatePassword(password);
      if(isPassword){
        const token= await user.getJWT();
        res.cookie("token",token);
        res.send("Login successful")
      }
      else{
        throw new Error("Invalid Credentials")
      }
  
    }catch(err){
      res.status(500).send("ERROR: "+err)
    }
     
    
  
  })

module.exports=authRouter