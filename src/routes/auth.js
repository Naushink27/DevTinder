const express = require('express')
const authRouter=express.Router();
const User= require("../models/user")
const bcrypt= require('bcrypt');
const {validateSignup}=require('../utils/validate')
const jwt=require('jsonwebtoken')
const userAuth=require('../middlewares/auth')
const updateUserStatus = async (userId, status) => {
  try {
    await User.findByIdAndUpdate(userId, { isOnline: status });
  } catch (error) {
    console.error("Failed to update user status:", error);
  }
};
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
     res.send(user);
        
      }
      catch(err){
        res.status(400).json({ error: err.message });
      }
     
  })
authRouter.post("/login",async(req,res)=>{
    try{
      const {email,password}=req.body;
      if(!email || !password){
        throw new Error("Email and password are required")
      }
      const user= await User.findOne({email:email});
    
      if(!user){
        throw new Error("invalid Credentials!!");
      }
    const isPassword=await  user.validatePassword(password);
      if(isPassword){
        const token= await user.getJWT();
        res.cookie("token", token, {
          httpOnly: true,
  secure: true,
  sameSite: "None"
        });

        await updateUserStatus(user._id,true);
        res.send(user)
      }
      else{
        throw new Error("Invalid Credentials")
      }
  
    }catch(err){
      res.status(400).json({ error: err.message });
    }
     
    
  
  })
  authRouter.post("/logout", async (req, res) => {
    try {
      
  const token= req.cookies.token;
  const decodedData=jwt.verify(token,process.env.JWT_SECRET_KEY);
  const userId=decodedData.id;
  
      // Clear the cookie
      res.cookie("token", null, {
        expires: new Date(Date.now()),
      });
  
      // ✅ Update the user's status to offline
    
await updateUserStatus(userId, false);

await User.findByIdAndUpdate(userId, { lastLogin: new Date() });  
      
  
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error.message);
      res.status(500).json({ error: "Server error during logout" });
    }
  });
  
  

module.exports=authRouter