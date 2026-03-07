const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    wallet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
      required: true,
    },

    title: {
      type: String,
      required: [true, "Transaction title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be positive"],
    },

    category: {
      type: String,
      required: true,
      index: true, // 🔥 Faster category analytics
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
      index: true,
    },

    note: {
      type: String,
      trim: true,
      maxlength: 300,
    },

    receipt: {
      type: String, // Cloudinary URL
    },

    isRecurring: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false, // 🔥 Soft delete support
    },
  },
  { timestamps: true }
);

// 🔥 Compound index for monthly analytics
transactionSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model("Transaction", transactionSchema);