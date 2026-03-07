const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  setBudget,
  getBudgets,
  deleteBudget
} = require("../controllers/budgetController");

const router = express.Router();

// CREATE + GET BUDGET
router
  .route("/")
  .post(protect, setBudget)
  .get(protect, getBudgets);

// DELETE BUDGET
router.delete("/:id", protect, deleteBudget);

module.exports = router;