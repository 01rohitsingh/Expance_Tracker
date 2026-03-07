const Wallet = require("../models/Wallet");

// Create Wallet
exports.createWallet = async (req, res) => {
  try {
    const { name, type, balance, currency } = req.body;

    // Validation (model ke according)
    if (!name || !type) {
      return res.status(400).json({
        message: "Name and type are required",
      });
    }

    const wallet = await Wallet.create({
      user: req.user._id,
      name,
      type,
      balance: balance ?? 0,
      currency: currency ?? "INR",
    });

    res.status(201).json(wallet);
  } catch (error) {
    // Duplicate wallet name per user
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Wallet with this name already exists",
      });
    }

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.getWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find({
      user: req.user._id,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.json(wallets);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Delete Wallet
exports.deleteWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findById(req.params.id);

    if (!wallet) {
      return res.status(404).json({
        message: "Wallet not found",
      });
    }

    // ensure wallet belongs to logged user
    if (wallet.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await wallet.deleteOne();

    res.json({
      message: "Wallet deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};