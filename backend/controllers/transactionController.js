const Transaction = require("../models/Transaction");
const Wallet = require("../models/Wallet");
const Notification = require("../models/Notification");
const exportTransactionsCSV = require("../utils/csvExport");
const calculateFinancialScore = require("../utils/financialScore");


/*
---------------------------------------
ADD TRANSACTION
---------------------------------------
*/
exports.addTransaction = async (req, res, next) => {

  try {

    const { title, amount, category, type, wallet, date, note } = req.body;

    if (!title || !amount || !category || !type || !wallet) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({
        message: "Invalid transaction type"
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than 0"
      });
    }

    const userWallet = await Wallet.findOne({
      _id: wallet,
      user: req.user._id
    });

    if (!userWallet) {
      return res.status(404).json({
        message: "Wallet not found"
      });
    }

    // expense balance check
    if (type === "expense" && userWallet.balance < amount) {
      return res.status(400).json({
        message: "Insufficient wallet balance"
      });
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      wallet,
      title,
      amount,
      category,
      type,
      date,
      note
    });

    // update wallet balance
    if (type === "income") {
      userWallet.balance += amount;
    } else {
      userWallet.balance -= amount;
    }

    await userWallet.save();

    // notification
    await Notification.create({
      userId: req.user._id,
      message: `New transaction "${title}" of ₹${amount} added`,
      seen: false
    });

    res.status(201).json(transaction);

  } catch (error) {

    next(error);

  }

};


/*
---------------------------------------
GET ALL TRANSACTIONS
---------------------------------------
*/
exports.getTransactions = async (req, res, next) => {

  try {

    const transactions = await Transaction.find({
      user: req.user._id,
      isDeleted: false
    })
      .populate("wallet", "name balance")
      .sort({ date: -1 });

    res.json(transactions);

  } catch (error) {

    next(error);

  }

};


/*
---------------------------------------
DELETE TRANSACTION (SOFT DELETE)
---------------------------------------
*/
exports.deleteTransaction = async (req, res, next) => {

  try {

    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    const wallet = await Wallet.findById(transaction.wallet);

    // reverse wallet balance
    if (transaction.type === "income") {
      wallet.balance -= transaction.amount;
    } else {
      wallet.balance += transaction.amount;
    }

    await wallet.save();

    transaction.isDeleted = true;

    await transaction.save();

    await Notification.create({
      userId: req.user._id,
      message: `Transaction "${transaction.title}" deleted`,
      seen: false
    });

    res.json({
      message: "Transaction deleted successfully"
    });

  } catch (error) {

    next(error);

  }

};


/*
---------------------------------------
UPDATE TRANSACTION
---------------------------------------
*/
exports.updateTransaction = async (req, res, next) => {

  try {

    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id,
      isDeleted: false
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    const oldWallet = await Wallet.findById(transaction.wallet);

    // reverse old balance
    if (transaction.type === "income") {
      oldWallet.balance -= transaction.amount;
    } else {
      oldWallet.balance += transaction.amount;
    }

    await oldWallet.save();

    const newAmount = req.body.amount ?? transaction.amount;

    const newType = req.body.type ?? transaction.type;

    const newWalletId = req.body.wallet ?? transaction.wallet;

    const newWallet = await Wallet.findOne({
      _id: newWalletId,
      user: req.user._id
    });

    if (!newWallet) {
      return res.status(404).json({
        message: "Wallet not found"
      });
    }

    if (newType === "expense" && newWallet.balance < newAmount) {
      return res.status(400).json({
        message: "Insufficient balance"
      });
    }

    // apply new balance
    if (newType === "income") {
      newWallet.balance += newAmount;
    } else {
      newWallet.balance -= newAmount;
    }

    await newWallet.save();

    transaction.title = req.body.title ?? transaction.title;
    transaction.amount = newAmount;
    transaction.category = req.body.category ?? transaction.category;
    transaction.type = newType;
    transaction.wallet = newWalletId;
    transaction.note = req.body.note ?? transaction.note;
    transaction.date = req.body.date ?? transaction.date;

    await transaction.save();

    await Notification.create({
      userId: req.user._id,
      message: `Transaction "${transaction.title}" updated`,
      seen: false
    });

    res.json(transaction);

  } catch (error) {

    next(error);

  }

};


/*
---------------------------------------
EXPORT CSV
---------------------------------------
*/
exports.exportCSV = async (req, res, next) => {

  try {

    const csv = await exportTransactionsCSV(req.user._id);

    res.header("Content-Type", "text/csv");

    res.attachment("transactions.csv");

    res.send(csv);

  } catch (error) {

    next(error);

  }

};


/*
---------------------------------------
FINANCIAL HEALTH SCORE
---------------------------------------
*/
exports.getFinancialScore = async (req, res, next) => {

  try {

    const score = await calculateFinancialScore(req.user._id);

    res.json({
      score
    });

  } catch (error) {

    next(error);

  }

};