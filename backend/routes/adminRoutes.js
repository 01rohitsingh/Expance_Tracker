const express = require("express");

const router = express.Router();

const adminAuth = require("../middleware/adminAuth");

const {
  adminLogin,
  getDashboard,
  getAllUsers,
  deleteUser,
  blockUser,
  unblockUser,
  getAllTransactions,
  deleteTransaction,
  monthlyAnalytics
} = require("../controllers/adminController");


/*
----------------------------
ADMIN LOGIN
----------------------------
*/

router.post("/login", adminLogin);


/*
----------------------------
DASHBOARD
----------------------------
*/

router.get("/dashboard", adminAuth, getDashboard);


/*
----------------------------
USERS
----------------------------
*/

router.get("/users", adminAuth, getAllUsers);

router.delete("/user/:id", adminAuth, deleteUser);

router.put("/block-user/:id", adminAuth, blockUser);

router.put("/unblock-user/:id", adminAuth, unblockUser);


/*
----------------------------
TRANSACTIONS
----------------------------
*/

router.get("/transactions", adminAuth, getAllTransactions);

router.delete("/transaction/:id", adminAuth, deleteTransaction);


/*
----------------------------
ANALYTICS
----------------------------
*/

router.get("/analytics", adminAuth, monthlyAnalytics);


module.exports = router;