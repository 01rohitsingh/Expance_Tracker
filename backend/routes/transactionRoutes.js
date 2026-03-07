const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  exportCSV,
  getFinancialScore,
} = require("../controllers/transactionController");

const router = express.Router();

/*
---------------------------------------
BASE ROUTE
POST   /api/transactions
GET    /api/transactions
---------------------------------------
*/
router
  .route("/")
  .post(protect, addTransaction)
  .get(protect, getTransactions);

/*
---------------------------------------
EXPORT CSV
GET  /api/transactions/export
---------------------------------------
*/
router.get("/export", protect, exportCSV);

/*
---------------------------------------
FINANCIAL HEALTH SCORE
GET  /api/transactions/score
---------------------------------------
*/
router.get("/score", protect, getFinancialScore);

/*
---------------------------------------
UPDATE & DELETE
PUT     /api/transactions/:id
DELETE  /api/transactions/:id
---------------------------------------
*/
router
  .route("/:id")
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);

module.exports = router;