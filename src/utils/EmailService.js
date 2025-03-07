const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587 ,
  auth: {
    user: "876853002@smtp-brevo.com",  // Use the email you signed up with
    pass: "5Da0zvy6ntgQIWMX"
  }
});

const sendEmail = async (toEmail, senderName, status) => {
  try {
    const mailOptions = {
      from: '"DevTinder" naushink2709@gmail.com',
      to: toEmail,
      subject: `New Connection Request on DevTinder!`,
      html: `<p>Hey, you received a new connection request on DevTinder!</p>
             <p><strong>${senderName}</strong> is <strong>${status}</strong> in your profile.</p>
             <p>Login to DevTinder and check your requests.</p>`
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmail };
