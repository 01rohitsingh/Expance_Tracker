const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  setBudget,
  getBudgets,
} = require("../controllers/budgetController");

const router = express.Router();

// Protected Routes
router
  .route("/")
  .post(protect, setBudget)
  .get(protect, getBudgets);

module.exports = router;