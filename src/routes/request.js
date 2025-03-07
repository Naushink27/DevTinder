const express = require('express');
const { userAuth } = require('../middlewares/auth');
const User = require('../models/user');
const ConnectionRequest = require('../models/connectionRequest');
const { sendEmail } = require('../utils/EmailService.js');

const requestRouter = express.Router();




requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id; // User who is sending the request
    const toUserId = req.params.toUserId; // User who is receiving the request
    const status = req.params.status; // Status: 'ignored' or 'interested'

    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      throw new Error("Invalid status value!");
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      throw new Error("No user found with the given ID.");
    }

    if (toUserId.toString() === fromUserId.toString()) {
      throw new Error("You cannot send a request to yourself.");
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }
      ]
    });

    if (existingConnectionRequest) {
      throw new Error("A connection request already exists between these users.");
    }

    // Create and save the connection request
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    });

    const data = await connectionRequest.save();

    // **Send Email Notification to the recipient (toUser)**
    await sendEmail(toUser.email, req.user.firstName, status);

    res.json({
      message: `${req.user.firstName} is ${status} in ${toUser.firstName}'s profile.`,
      data: data
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
        const LoggedInId=req.user._id;
        const{status,requestId}=req.params;
    
        const allowedStatus=["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            throw new Error("Invalid Status!!!")
        }

        const connectionRequest =await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:LoggedInId,
            status:"interested"
        })
        if(!connectionRequest){
            throw new Error("Request cannot be made!!!")
        }

        connectionRequest.status=status;
       const data=await connectionRequest.save();
        res.status(200).json({
            messgae:`Request has been : ${status}`,
            data:data
        })
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
    

})

module.exports = requestRouter;
