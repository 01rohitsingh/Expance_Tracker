const Recurring = require("../models/Recurring");

// ➕ Create Recurring
exports.createRecurring = async (req, res) => {
  try {
    const {
      wallet,
      title,
      amount,
      category,
      type,
      frequency,
      nextRun,
      endDate,
      note,
    } = req.body;

    // Basic validation
    if (!wallet || !title || !amount || !category || !type || !frequency || !nextRun) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    const recurring = await Recurring.create({
      user: req.user._id,
      wallet,
      title,
      amount,
      category,
      type,
      frequency,
      nextRun,
      endDate,
      note,
    });

    res.status(201).json(recurring);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// 📄 Get Recurring (only active ones)
exports.getRecurring = async (req, res) => {
  try {
    const data = await Recurring.find({
      user: req.user._id,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};