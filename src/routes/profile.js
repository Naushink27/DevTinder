const express= require('express')
const profileRouter= express.Router();
const {userAuth}=require('../middlewares/auth')
const {validateEditProfileData}=require("../utils/validate")
const User =require("../models/user")
const bcrypt=require('bcrypt')
const validator=require('validator')
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{ 
     const user=req.user;
      res.send(user)
   }
    catch(err){
     res.status(500).send("ERROR: "+err)
    }
   })

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try{ 
    if(!validateEditProfileData(req)){
      throw new Error("Invalid edit Request")
    }
   const loggedInUser=req.user;
   const{_id}=loggedInUser;
   const updateProfile= await User.findByIdAndUpdate(_id, req.body);
   res.json({
      message:`${loggedInUser.firstName},`,
      data:updateProfile
   })
   }
   catch(err){
      res.status(500).send("ERROR"+err)
   }
})

profileRouter.patch("/profile/edit/password", userAuth, async (req, res) => {
   try {
       const { password: newPassword } = req.body; // Extract password from body
       const loggedInUser = req.user; // Get logged-in user from middleware
  
       if(!validator.isStrongPassword(newPassword)){
         throw new Error("invalid credentials")
       }
      
       // Hash the new password before saving
       const hashedPassword = await bcrypt.hash(newPassword, 10);
       loggedInUser.password = hashedPassword;

       await loggedInUser.save(); // Await the save operation
       res.send("Password updated successfully");
   } catch (err) {
       res.status(500).send("ERROR "+err);
   }
});
  
module.exports= profileRouter