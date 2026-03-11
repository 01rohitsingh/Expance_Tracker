const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      index: true,
    },

    limit: {
      type: Number,
      required: [true, "Budget limit is required"],
      min: [0, "Budget limit must be positive"],
    },

    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },

    year: {
      type: Number,
      required: true,
      min: 2000,
    },

    isActive: {
      type: Boolean,
      default: true, 
    },
  },
  { timestamps: true }
);

// 🔥 Prevent duplicate budget for same user + category + month + year
budgetSchema.index(
  { user: 1, category: 1, month: 1, year: 1 },
  { unique: true }
);

module.exports = mongoose.model("Budget", budgetSchema);