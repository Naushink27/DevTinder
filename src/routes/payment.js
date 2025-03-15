const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser"); // Ensure proper parsing
const User = require("../models/user");
const Payment = require("../models/payment");
const paymentRouter = express.Router();

paymentRouter.use(bodyParser.json()); // Ensure raw body parsing

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    console.log("✅ Webhook Received");

    const webhookSignature = req.get("X-Razorpay-Signature");
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSignature || !secret) {
      console.log("❌ Webhook Signature or Secret Missing");
      return res.status(400).json({ msg: "Invalid Webhook Configuration" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (expectedSignature !== webhookSignature) {
      console.log("❌ Invalid Webhook Signature");
      return res.status(400).json({ msg: "Webhook signature is invalid" });
    }

    console.log("✅ Valid Webhook Signature");

    // Update payment status
    const paymentDetails = req.body.payload.payment.entity;
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });

    if (!payment) {
      console.log("❌ Payment not found in DB");
      return res.status(404).json({ msg: "Payment record not found" });
    }

    payment.status = paymentDetails.status;
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
    console.error("❌ Webhook Processing Failed:", err);
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = paymentRouter;
