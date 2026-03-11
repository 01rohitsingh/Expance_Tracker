const express = require("express");

const {
  getNotifications,
  markAllSeen,
  deleteNotification,
  getUnseenCount
} = require("../controllers/notificationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// GET USER NOTIFICATIONS
router.get("/", protect, getNotifications);

// MARK ALL AS SEEN
router.put("/mark-seen", protect, markAllSeen);

// GET UNSEEN COUNT
router.get("/unseen-count", protect, getUnseenCount);
// DELETE NOTIFICATION
router.delete("/:id", protect, deleteNotification);

module.exports = router;