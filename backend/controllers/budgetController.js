const Budget = require("../models/Budget");
const Notification = require("../models/Notification");

/* CREATE BUDGET */

const setBudget = async (req, res) => {
  try {

    const { category, limit, month, year } = req.body;

    const budget = await Budget.create({
      user: req.user._id,
      category,
      limit,
      month,
      year
    });

    // ⭐ CREATE NOTIFICATION
    await Notification.create({
      userId: req.user._id,
      message: `Budget set for "${category}" with limit ₹${limit}`
    });

    res.status(201).json(budget);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to create budget"
    });

  }
};


/* GET BUDGETS */

const getBudgets = async (req, res) => {
  try {

    const budgets = await Budget.find({
      user: req.user._id,
      isActive: true
    }).sort({ createdAt: -1 });

    res.json(budgets);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch budgets"
    });

  }
};


/* DELETE BUDGET */

const deleteBudget = async (req, res) => {
  try {

    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({
        message: "Budget not found"
      });
    }

    await budget.deleteOne();

    // ⭐ CREATE NOTIFICATION
    await Notification.create({
      userId: req.user._id,
      message: `Budget for "${budget.category}" deleted`
    });

    res.json({
      message: "Budget deleted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};


module.exports = {
  setBudget,
  getBudgets,
  deleteBudget
};