const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    // ✅ Ensure req.cookies is defined before accessing `token`
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Please login first" }); // ✅ Send 401 Unauthorized
    }

    // ✅ Verify Token
    const decodedData = jwt.verify(token, "Dev@Tinder$123");
    const { id } = decodedData;

    // ✅ Find User in Database
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({ error: "Invalid User!!!!" });
    }

    req.user = user;
    next(); // ✅ Pass control to the next middleware

  } catch (err) {
    return res.status(401).json({ error: "Invalid or Expired Token" });
  }
};

module.exports = { userAuth };
