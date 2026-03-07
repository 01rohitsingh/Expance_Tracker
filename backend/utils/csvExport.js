const Transaction = require("../models/Transaction");
const { Parser } = require("json2csv");

const exportTransactionsCSV = async (userId) => {
  // Only active transactions (model me isDeleted hai)
  const transactions = await Transaction.find({
    user: userId,
    isDeleted: false,
  })
    .select("title amount category type date")
    .lean();

  if (!transactions.length) {
    return "";
  }

  // Format date properly
  const formatted = transactions.map((t) => ({
    ...t,
    date: new Date(t.date).toISOString().split("T")[0],
  }));

  const fields = ["title", "amount", "category", "type", "date"];
  const parser = new Parser({ fields });

  return parser.parse(formatted);
};

module.exports = exportTransactionsCSV;