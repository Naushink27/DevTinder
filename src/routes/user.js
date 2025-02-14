const express= require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const { populate } = require('../models/user');
const userRouter=express.Router();
const USER_SAFE_DATA="firstName lastName skills about gender age";
userRouter.get("/user/connections/received",userAuth,async(req,res)=>{
    try{

        const loggedInUser=req.user;
        const connectionRequest=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate(
            "fromUserId",USER_DATABASE
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

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{

        const loggedInUser=req.user;
        const connectionRequest= await ConnectionRequest.find({
         $or:[
            {toUserId:loggedInUser._id,status:"accepted"},
            {fromUserId:loggedInUser._id,status:"accepted"}
         ]
        }).populate(
            "fromUserId",USER_SAFE_DATA
        ).populate(
            "toUserId",USER_SAFE_DATA
        )
         if(!connectionRequest){
            throw new Error("No request found from this UserId")
         }

        const data =connectionRequest.map(row=>{
            if(loggedInUser._id.toString()===row.fromUserId._id.toString()){
                return row.toUserId;
            }
           return row.fromUserId;
        })
        res.json({
            message:`Following are the connection of ${loggedInUser.firstName}`,
            data:data
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }

})

module.exports=userRouter;