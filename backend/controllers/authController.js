const User = require("../models/User");
const Wallet = require("../models/Wallet");
const jwt = require("jsonwebtoken");


// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};


/*
---------------------------------------
REGISTER USER (FAST)
---------------------------------------
*/
exports.register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }

    // create user directly (unique email handled by schema)
    const user = await User.create({
      name,
      email,
      password
    });

    // create default wallet
    Wallet.create({
      user: user._id,
      name: "Cash",
      type: "cash",
      balance: 0,
      currency: "INR"
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        token: generateToken(user._id)
      }
    });

  } catch (error) {

    // duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



/*
---------------------------------------
LOGIN USER (FAST)
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
      message: error.message
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
      message: error.message
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
      message: error.message
    });

  }

};