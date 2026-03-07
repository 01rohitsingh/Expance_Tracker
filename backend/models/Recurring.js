const mongoose = require("mongoose");

const recurringSchema = new mongoose.Schema(
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
      required: [true, "Title is required"],
      trim: true,
      maxlength: 100,
    },

    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be positive"],
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },

    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      required: true,
    },

    nextRun: {
      type: Date,
      required: true,
      index: true,
    },

    endDate: {
      type: Date, // optional stop date
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    note: {
      type: String,
      maxlength: 300,
    },
  },
  { timestamps: true }
);

// Compound index for automation queries
recurringSchema.index({ user: 1, nextRun: 1 });

module.exports = mongoose.model("Recurring", recurringSchema);