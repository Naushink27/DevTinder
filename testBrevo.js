const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure .env is loaded

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,  // ✅ Use 587 (not 465)
  secure: false, // ✅ Must be false for 587
  auth: {
    user: "naushink2709@gmail.com",  // ✅ Your Brevo verified email
    pass: process.env.BREVO_API_KEY  // ✅ Your Brevo API key from .env
  }
});

// **1️⃣ Check SMTP Connection**
transporter.verify(function (error, success) {
  if (error) {
    console.error("🚨 SMTP Connection Error:", error);
  } else {
    console.log("✅ SMTP is ready to send emails!");
  }
});

// **2️⃣ Send a test email**
async function sendTestEmail() {
  try {
    let info = await transporter.sendMail({
      from: '"DevTinder" <naushink2709@gmail.com>', // ✅ Verified sender
      to: "your_email@example.com", // ✅ Replace with your email
      subject: "Test Email from Brevo SMTP",
      text: "Hey! This is a test email from Brevo SMTP."
    });

    console.log("✅ Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("🚨 Error sending email:", error);
  }
}

sendTestEmail();
