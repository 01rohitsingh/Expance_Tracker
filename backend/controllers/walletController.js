const Wallet = require("../models/Wallet");
const Notification = require("../models/Notification");

/*
---------------------------------------
CREATE WALLET
---------------------------------------
*/
exports.createWallet = async (req, res) => {
  try {

    const { name, type, balance, currency } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        message: "Name and type are required"
      });
    }

    const wallet = await Wallet.create({
      user: req.user._id,
      name,
      type,
      balance: balance ?? 0,
      currency: currency ?? "INR"
    });

    // 🔔 Notification
    await Notification.create({
      userId: req.user._id,
      message: `Wallet "${name}" created with ₹${wallet.balance}`,
      seen: false
    });

    res.status(201).json(wallet);

  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Wallet with this name already exists"
      });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }
};


/*
---------------------------------------
GET USER WALLETS
---------------------------------------
*/
exports.getWallets = async (req, res) => {
  try {

    const wallets = await Wallet.find({
      user: req.user._id,
      isActive: true
    }).sort({ createdAt: -1 });

    res.json(wallets);

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }
};


/*
---------------------------------------
DELETE WALLET
---------------------------------------
*/
exports.deleteWallet = async (req, res) => {
  try {

    const wallet = await Wallet.findById(req.params.id);

    if (!wallet) {
      return res.status(404).json({
        message: "Wallet not found"
      });
    }

    if (wallet.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    await wallet.deleteOne();

    // 🔔 Notification
    await Notification.create({
      userId: req.user._id,
      message: `Wallet "${wallet.name}" deleted`,
      seen: false
    });

    res.json({
      message: "Wallet deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }
};