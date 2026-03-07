const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createRecurring,
  getRecurring,
} = require("../controllers/recurringController");

const router = express.Router();

// Protected Routes
router
  .route("/")
  .post(protect, createRecurring)
  .get(protect, getRecurring);

module.exports = router;