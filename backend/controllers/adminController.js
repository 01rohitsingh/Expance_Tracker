const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Transaction = require("../models/Transaction");
const Wallet = require("../models/Wallet");


/*
--------------------------------
ADMIN LOGIN
--------------------------------
*/

exports.adminLogin = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        message: "Invalid admin credentials"
      });
    }

    const token = jwt.sign(
      {
        id: "admin",      // ⭐ important
        role: "admin"
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      admin: {
        email: process.env.ADMIN_EMAIL
      }
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};



/*
--------------------------------
ADMIN DASHBOARD
--------------------------------
*/

exports.getDashboard = async (req, res) => {

  try {

    const totalUsers = await User.countDocuments();

    const totalTransactions = await Transaction.countDocuments();

    const income = await Transaction.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const expense = await Transaction.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalWallets = await Wallet.countDocuments();

    res.json({
      totalUsers,
      totalTransactions,
      totalWallets,
      totalIncome: income[0]?.total || 0,
      totalExpense: expense[0]?.total || 0
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



/*
--------------------------------
GET ALL USERS
--------------------------------
*/

exports.getAllUsers = async (req, res) => {

  try {

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



/*
--------------------------------
DELETE USER
--------------------------------
*/

exports.deleteUser = async (req, res) => {

  try {

    const userId = req.params.id;

    await User.findByIdAndDelete(userId);

    await Wallet.deleteMany({ user: userId });

    await Transaction.deleteMany({ user: userId });

    res.json({
      message: "User deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



/*
--------------------------------
BLOCK USER
--------------------------------
*/

exports.blockUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.isActive = false;

    await user.save();

    res.json({
      message: "User blocked"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



/*
--------------------------------
UNBLOCK USER
--------------------------------
*/

exports.unblockUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.isActive = true;

    await user.save();

    res.json({
      message: "User unblocked"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



/*
--------------------------------
GET ALL TRANSACTIONS
--------------------------------
*/

exports.getAllTransactions = async (req, res) => {

  try {

    const transactions = await Transaction.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(transactions);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



/*
--------------------------------
DELETE TRANSACTION
--------------------------------
*/

exports.deleteTransaction = async (req, res) => {

  try {

    await Transaction.findByIdAndDelete(req.params.id);

    res.json({
      message: "Transaction deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



/*
--------------------------------
MONTHLY ANALYTICS
--------------------------------
*/

exports.monthlyAnalytics = async (req, res) => {

  try {

    const data = await Transaction.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
            }
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
            }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

/*
--------------------------------
ADMIN DASHBOARD
--------------------------------
*/

exports.getDashboard = async (req, res) => {

  try {

    // total users
    const totalUsers = await User.countDocuments();

    // total transactions
    const totalTransactions = await Transaction.countDocuments();

    // total income
    const incomeResult = await Transaction.aggregate([
      { $match: { type: "income" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    // total expense
    const expenseResult = await Transaction.aggregate([
      { $match: { type: "expense" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    // safe values
    const totalIncome = incomeResult.length ? incomeResult[0].total : 0;
    const totalExpense = expenseResult.length ? expenseResult[0].total : 0;

    res.json({
      totalUsers,
      totalTransactions,
      totalIncome,
      totalExpense
    });

  } catch (error) {

    console.error("Dashboard Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};



/*
--------------------------------
TOP  CATEGORIES
--------------------------------
*/

exports.topCategories = async (req, res) => {

  try {

    const data = await Transaction.aggregate([
      {
        $match: { type: "expense" }
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: { total: -1 }
      },
      {
        $limit: 5
      }
    ]);

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

/*
--------------------------------
GET USER DETAILS
--------------------------------
*/

exports.getUserDetails = async (req, res) => {

  try {

    const userId = req.params.id;

    // USER PROFILE
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // USER TRANSACTIONS
    const transactions = await Transaction.find({
      user: userId
    }).sort({ date: -1 });

    // TOTAL INCOME
    const incomeResult = await Transaction.aggregate([
      { $match: { user: user._id, type: "income" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    // TOTAL EXPENSE
    const expenseResult = await Transaction.aggregate([
      { $match: { user: user._id, type: "expense" } },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" }
        }
      }
    ]);

    const totalIncome = incomeResult.length ? incomeResult[0].total : 0;
    const totalExpense = expenseResult.length ? expenseResult[0].total : 0;

    res.json({
      user,
      transactions,
      totalIncome,
      totalExpense
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

/*
--------------------------------
TOP 5 SPENDING USERS
--------------------------------
*/

exports.topSpendingUsers = async (req, res) => {

  try {

    const data = await Transaction.aggregate([

      // sirf expense transactions
      {
        $match: { type: "expense" }
      },

      // user wise total spending
      {
        $group: {
          _id: "$user",
          totalSpent: { $sum: "$amount" }
        }
      },

      // user details join
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },

      {
        $unwind: "$user"
      },

      // fields select
      {
        $project: {
          name: "$user.name",
          email: "$user.email",
          totalSpent: 1
        }
      },

      // highest spending
      {
        $sort: { totalSpent: -1 }
      },

      // top 5
      {
        $limit: 5
      }

    ]);

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
