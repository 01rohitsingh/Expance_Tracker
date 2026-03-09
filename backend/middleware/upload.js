const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "profile_photos",
      format: file.mimetype.split("/")[1], // jpg / png / jpeg
      public_id: Date.now() + "-" + file.originalname
    };
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  }
});

module.exports = upload;