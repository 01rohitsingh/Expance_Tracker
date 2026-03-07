const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createWallet,
  getWallets,
  deleteWallet
} = require("../controllers/walletController");

const router = express.Router();

router
  .route("/")
  .post(protect, createWallet)
  .get(protect, getWallets);

router.delete("/:id", protect, deleteWallet);

module.exports = router;