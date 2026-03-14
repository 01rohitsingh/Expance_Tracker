const User = require("../models/User");
const Wallet = require("../models/Wallet");
const jwt = require("jsonwebtoken");


/*
---------------------------------------
GENERATE JWT TOKEN
---------------------------------------
*/
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


/*
---------------------------------------
REGISTER USER
---------------------------------------
*/
exports.register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    // Create default wallet
    await Wallet.create({
      user: user._id,
      name: "Cash",
      type: "cash",
      balance: 0,
      currency: "INR"
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        token: generateToken(user._id)
      }
    });

  } catch (error) {

    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error during registration"
    });

  }

};


/*
---------------------------------------
LOGIN USER
---------------------------------------
*/
exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required"
      });
    }

    const user = await User
      .findOne({ email })
      .select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo,
        token: generateToken(user._id)
      }
    });

  } catch (error) {

    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error during login"
    });

  }

};


/*
---------------------------------------
CHANGE PASSWORD
---------------------------------------
*/
exports.changePassword = async (req, res) => {

  try {

    const { currentPassword, newPassword } = req.body;

    const user = await User
      .findById(req.user._id)
      .select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password incorrect"
      });
    }

    user.password = newPassword;

    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully"
    });

  } catch (error) {

    console.error("CHANGE PASSWORD ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error while changing password"
    });

  }

};


/*
---------------------------------------
DELETE ACCOUNT
---------------------------------------
*/
exports.deleteAccount = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    await user.deleteOne();

    res.json({
      success: true,
      message: "Account deleted successfully"
    });

  } catch (error) {

    console.error("DELETE ACCOUNT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error while deleting account"
    });

  }

};
