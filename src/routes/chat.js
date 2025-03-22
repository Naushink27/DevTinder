const express= require('express');
const {Chat} = require('../models/chat');
const chatRouter=express.Router();
const {userAuth}=require('../middlewares/auth');
chatRouter.get("/chat/:targetUserId",userAuth,async(req,res)=>{

    try{
            const {targetUserId}=req.params;
            const userId=req.user._id;

            let chat= await Chat.findOne({
                participants:{$all:[userId,targetUserId]}

            }).populate({
                path: "message.senderId",
                select:"firstName lastName"
            })

            if(!chat){
                chat=new Chat({
                    participants:[userId,targetUserId],
                    message:[]
                })
                await chat.save();
            }

            res.json(chat);
    }catch(error){
        console.error("Error fetching chat:",error);
        res.status(500).json({message:"Internal Server Error"});
    }
})
module.exports=chatRouter;