const Transaction = require("../models/Transaction");

const calculateFinancialScore = async (userId) => {
  // Aggregate instead of loading all transactions
  const result = await Transaction.aggregate([
    {
      $match: {
        user: userId,
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  let income = 0;
  let expense = 0;

  result.forEach((r) => {
    if (r._id === "income") income = r.total;
    if (r._id === "expense") expense = r.total;
  });

  if (income === 0) return 0;

  const savingRatio = (income - expense) / income;

  let score = 50; // Base score

  if (savingRatio > 0.4) score += 30;
  else if (savingRatio > 0.2) score += 20;
  else if (savingRatio > 0.1) score += 10;

  if (expense < income) score += 20;

  return Math.min(score, 100);
};

module.exports = calculateFinancialScore;