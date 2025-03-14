require('dotenv').config(); // Load .env only in development

console.log("🔹 All Environment Variables:", process.env); // Log all variables
console.log("🔹 RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("🔹 RAZORPAY_SECRET_KEY:", process.env.RAZORPAY_SECRET_KEY);

const Razorpay = require("razorpay");

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET_KEY) {
    console.error("❌ ERROR: Razorpay API keys are missing in Railway!");
    process.exit(1); // Stop execution if keys are missing
}

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
});

module.exports = razorpayInstance;
