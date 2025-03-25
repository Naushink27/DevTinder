const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validate");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");


profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      return res.status(400).json({ message: "Invalid edit request" });
    }

    const loggedInUser = req.user;
    const { _id } = loggedInUser;

    const updateProfile = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: `${loggedInUser.firstName}, your profile has been updated.`,
      data: updateProfile,
    });
  } catch (err) {
    console.error("Profile edit error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

profileRouter.patch("/profile/edit/password", userAuth, async (req, res) => {
  try {
    const { password: newPassword } = req.body;
    const loggedInUser = req.user;

    if (!newPassword) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (!validator.isStrongPassword(newPassword)) {
      return res.status(400).json({ message: "Password is weak. Use a strong password." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = hashedPassword;

    await loggedInUser.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Password update error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});
profileRouter.get("/profile/view/:targetUserId", userAuth, async (req, res) => {
  try {
    const { targetUserId } = req.params;
    console.log("userId:", targetUserId); // ✅ Debugging log

   

    const user = await User.findById(targetUserId)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user); // ✅ Debugging log
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = profileRouter;
