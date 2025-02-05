const express= require('express');
const {userAuth}=require('../middlewares/auth')
const requestRouter=express.Router();

requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user=req.user;
    res.send("Request sent by:"+user.firstName);
 })

module.exports=requestRouter