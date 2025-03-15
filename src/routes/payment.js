const express = require("express");
const crypto = require("crypto");
const User = require("../models/user");  // Import User model
const Payment = require("../models/payment");  // Import Payment model
const paymentRouter = express.Router();

paymentRouter.post("/payment/webhook", express.json({ type: "application/json" }), async (req, res) => {
    try {
        console.log("✅ Webhook Called:", req.body);

        // Verify webhook signature
        const webhookSignature = req.get("X-Razorpay-Signature");
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(JSON.stringify(req.body))
            .digest("hex");

        if (expectedSignature !== webhookSignature) {
            console.log("❌ Invalid Webhook Signature");
            return res.status(400).json({ msg: "Webhook signature is invalid" });
        }

        console.log("✅ Valid Webhook Signature");

        // Get payment details
        const paymentDetails = req.body.payload.payment.entity;
        const { order_id, status } = paymentDetails;
        
        // Find payment record
        const payment = await Payment.findOne({ orderId: order_id });
        if (!payment) {
            console.log("❌ Payment record not found");
            return res.status(404).json({ msg: "Payment record not found" });
        }

        // Update payment status
        payment.status = status;
        await payment.save();
        console.log("✅ Payment status updated in DB");

        // Find user & upgrade to premium
        const user = await User.findOne({ _id: payment.userId });
        if (!user) {
            console.log("❌ User not found");
            return res.status(404).json({ msg: "User not found" });
        }

        user.isPremium = true;
        user.membershipType = payment.notes.membershipType;
        await user.save();
        console.log(`✅ User ${user.email} upgraded to Premium`);

        return res.status(200).json({ msg: "Webhook received and processed successfully" });

    } catch (err) {
        console.error("❌ Webhook processing failed:", err);
        return res.status(500).json({ msg: err.message });
    }
});

module.exports = paymentRouter;
