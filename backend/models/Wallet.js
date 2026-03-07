const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: [true, "Wallet name is required"],
      trim: true,
    },

    type: {
      type: String,
      enum: ["cash", "bank", "credit", "upi"],
      required: true,
    },

    balance: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "INR",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// 🔥 Prevent duplicate wallet names per user
walletSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Wallet", walletSchema);