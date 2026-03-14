const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {

  try {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Not authorized"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ⭐ check role directly
    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required"
      });
    }

    req.admin = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid token"
    });

  }

};

module.exports = adminAuth;