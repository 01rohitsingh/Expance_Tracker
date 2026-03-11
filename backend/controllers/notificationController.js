const Notification = require("../models/Notification");


// GET USER NOTIFICATIONS
const getNotifications = async (req, res) => {
  try {

    const notifications = await Notification
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch notifications"
    });

  }
};



// MARK ALL AS SEEN
const markAllSeen = async (req, res) => {
  try {

    await Notification.updateMany(
      { userId: req.user._id, seen: false },   // only unseen
      { $set: { seen: true } }                 // correct mongo update
    );

    res.status(200).json({
      message: "All notifications marked as seen"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to update notifications"
    });

  }
};



// DELETE NOTIFICATION
const deleteNotification = async (req, res) => {
  try {

    const { id } = req.params;

    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found"
      });
    }

    res.status(200).json({
      message: "Notification deleted"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to delete notification"
    });

  }
};



// GET UNSEEN COUNT
const getUnseenCount = async (req, res) => {
  try {

    const count = await Notification.countDocuments({
      userId: req.user._id,
      seen: false
    });

    res.status(200).json({ count });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to get unseen count"
    });

  }
};



module.exports = {
  getNotifications,
  markAllSeen,
  deleteNotification,
  getUnseenCount
};