const express= require('express');
const {Chat} = require('../models/chat');
const chatRouter=express.Router();
const {userAuth}=require('../middlewares/auth');
const User=require('../models/user');
const mongoose=require('mongoose');
const ConnectionRequest = require('../models/connectionRequest');
chatRouter.get("/chat/:targetUserId",userAuth,async(req,res)=>{

    try{
            const {targetUserId}=req.params;
            const userId=req.user._id;
            if (!mongoose.Types.ObjectId.isValid(targetUserId) || !mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ error: "Invalid user ID" });
            }

            const targetUser= await User.findById(targetUserId).select("firstName lastName imageUrl isOnline lastLogin");
            let chat= await Chat.findOne({
                participants:{$all:[userId,targetUserId]}

            }).populate({
                path: "message.senderId",
                select:"firstName lastName"
            })
            const connection = await ConnectionRequest.findOne({
                $or: [
                    { fromUserId: userId, toUserId: targetUserId },
                    { fromUserId: targetUserId, toUserId: userId }
                ]
            });
    
            if (connection?.isBlocked) {
                return res.status(403).json({ message: "You cannot chat with this user as they are blocked." });
            }

            if(!chat){
                chat=new Chat({
                    participants:[userId,targetUserId],
                    message:[]
                })
                await chat.save();
            }

            res.json({chat,targetUser});
    }catch(error){
        console.error("Error fetching chat:",error);
        res.status(500).json({message:"Internal Server Error"});
    }
})

chatRouter.post("/block/:targetUserId", userAuth, async (req, res) => {
    try {
        const targetUser = req.params.targetUserId;
        const userId = req.user._id;

        const connection = await ConnectionRequest.findOne({
            $or: [
                { fromUserId: userId, toUserId: targetUser },
                { fromUserId: targetUser, toUserId: userId }
            ]
        });

        if (!connection) {
            return res.status(404).json({ message: "No connection found." });
        }

        // ✅ Toggle Block/Unblock
        connection.isBlocked = !connection.isBlocked;
       
        await connection.save();

        return res.status(200).json({ message: connection.isBlocked ? "User blocked" : "User unblocked", isBlocked: connection.isBlocked });
    } catch (err) {
        console.error("Error blocking user:", err);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports=chatRouter;