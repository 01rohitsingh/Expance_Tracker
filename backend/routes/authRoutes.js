const express = require("express");
const { register, login, changePassword, deleteAccount } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");
const upload = require("../middleware/upload");

const router = express.Router();


/* ================= REGISTER ================= */

router.post("/register", upload.single("photo"), register);



/* ================= LOGIN ================= */

router.post("/login", login);



/* ================= UPDATE PROFILE ================= */

router.put("/profile", protect, async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    await user.save();

    res.json({
      success: true,
      data: {
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    console.error("Profile update error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
});



/* ================= UPLOAD PROFILE PHOTO ================= */

router.put(
  "/upload-photo",
  protect,
  upload.single("photo"),
  async (req, res) => {

    try {

      // File check
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No photo uploaded"
        });
      }

      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      // Cloudinary URL
      user.photo = req.file.path;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Photo uploaded successfully",
        photo: user.photo
      });

    } catch (error) {

      console.error("Upload photo error:", error);

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);



/* ================= CHANGE PASSWORD ================= */

router.put("/change-password", protect, changePassword);



/* ================= DELETE ACCOUNT ================= */

router.delete("/delete-account", protect, deleteAccount);



module.exports = router;