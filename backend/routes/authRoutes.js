const express = require("express");
const { register, login, changePassword, deleteAccount } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

const multer = require("multer");
const path = require("path");

const router = express.Router();


// MULTER STORAGE

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "photo");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }

});

const upload = multer({ storage });




/* REGISTER */
router.post("/register", register);


/* LOGIN */
router.post("/login", login);



/* UPDATE PROFILE */
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

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});



/* UPLOAD PROFILE PHOTO */

router.put(
  "/upload-photo",
  protect,
  upload.single("photo"),
  async (req, res) => {

    try {

      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      user.photo = `/photo/${req.file.filename}`;

      await user.save();

      res.json({
        success: true,
        photo: user.photo
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);



/* CHANGE PASSWORD */
router.put("/change-password", protect, changePassword);


/* DELETE ACCOUNT */
router.delete("/delete-account", protect, deleteAccount);


module.exports = router;