const Budget = require("../models/Budget");

// 📝 Create Budget
exports.setBudget = async (req, res) => {
  try {
    const { category, limit, month, year } = req.body;

    // Basic validation
    if (!category || !limit || !month || !year) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const budget = await Budget.create({
      user: req.user._id,
      category,
      limit,
      month,
      year,
    });

    res.status(201).json(budget);
  } catch (error) {
    // Duplicate budget protection (compound index)
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Budget already exists for this category, month and year",
      });
    }

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// 📊 Get Budgets (with optional filter)
exports.getBudgets = async (req, res) => {
  try {
    const { month, year } = req.query;

    const filter = {
      user: req.user._id,
      isActive: true,
    };

    if (month) filter.month = Number(month);
    if (year) filter.year = Number(year);

    const budgets = await Budget.find(filter).sort({ createdAt: -1 });

    res.json(budgets);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};