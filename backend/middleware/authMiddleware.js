const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {

  try {

    let token;

    // 🔐 Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token = req.headers.authorization.split(" ")[1];

    }

    // ❌ Token missing
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing"
      });
    }

    // 🔑 Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👤 Find User
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    // Attach user to request
    req.user = user;

    next();

  } catch (error) {

    console.error("Auth Middleware Error:", error.message);

    res.status(401).json({
      success: false,
      message: "Not authorized, token invalid"
    });

  }

};