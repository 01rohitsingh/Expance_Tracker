const Notification = require("../models/Notification");

// GET USER NOTIFICATIONS
const getNotifications = async (req, res) => {
  try {

    const notifications = await Notification.find({
      userId: req.user._id
    }).sort({ createdAt: -1 });

    res.json(notifications);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch notifications"
    });

  }
};


// MARK ALL AS SEEN
const markAllSeen = async (req, res) => {
  try {

    await Notification.updateMany(
      { userId: req.user._id },
      { seen: true }
    );

    res.json({
      message: "All notifications marked as seen"
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to update notifications"
    });

  }
};


// DELETE NOTIFICATION
const deleteNotification = async (req, res) => {
  try {

    const { id } = req.params;

    await Notification.findByIdAndDelete(id);

    res.json({
      message: "Notification deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to delete notification"
    });

  }
};

module.exports = {
  getNotifications,
  markAllSeen,
  deleteNotification
};