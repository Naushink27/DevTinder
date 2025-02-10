const express = require('express');
const { userAuth } = require('../middlewares/auth');
const User = require('../models/user');
const ConnectionRequest = require('../models/connectionRequest');
const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            throw new Error("Invalid status value!");
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            throw new Error("No user found with the given ID.");
        }

        if (toUserId === fromUserId.toString()) {
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

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();

        res.json({
            message: `${req.user.firstName} is ${status} in ${toUser.firstName}'s profile.`,
            data: data
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = requestRouter;
