const express= require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const { populate } = require('../models/user');
const userRouter=express.Router();

userRouter.get("/user/connections/received",userAuth,async(req,res)=>{
    try{

        const loggedInUser=req.user;
        const connectionRequest=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate(
            "fromUserId","firstName lastName skills about gender age"
        )
           console.log(connectionRequest)
        res.json({
            message:"Data fetched successfully",
            data:connectionRequest
        })

    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
})

module.exports=userRouter;