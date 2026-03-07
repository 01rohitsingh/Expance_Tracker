require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cron = require("node-cron");
const path = require("path");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const walletRoutes = require("./routes/walletRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const recurringRoutes = require("./routes/recurringRoutes");

const Recurring = require("./models/Recurring");
const Transaction = require("./models/Transaction");
const Wallet = require("./models/Wallet");

const app = express();

// 🔗 Connect Database
connectDB();

// 🔐 Security Middlewares

app.use(
helmet({
crossOriginResourcePolicy: false
})
);

app.use(
cors({
origin: "*"
})
);

app.use(express.json());

// 📊 Logger (Development Mode)

if (process.env.NODE_ENV === "development") {
app.use(morgan("dev"));
}

// 📂 Serve Profile Photos

app.use("/photo", express.static(path.join(__dirname, "photo")));

// 🌍 Base Route

app.get("/", (req, res) => {
res.send("🚀 FinTrack API Running...");
});

// 📌 API Routes

app.use("/api/auth", authRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/recurring", recurringRoutes);

// 🔁 Recurring Cron Job (Every 5 Minutes)

cron.schedule("*/5 * * * *", async () => {

try {

```
const now = new Date();

const recurringItems = await Recurring.find({
  nextRun: { $lte: now },
  isActive: true
});

for (let item of recurringItems) {

  // Create Transaction

  await Transaction.create({
    user: item.user,
    wallet: item.wallet,
    title: item.title,
    amount: item.amount,
    category: item.category,
    type: item.type,
    isRecurring: true
  });


  // Update Wallet Balance

  const wallet = await Wallet.findById(item.wallet);

  if (!wallet) continue;

  wallet.balance =
    item.type === "income"
      ? wallet.balance + item.amount
      : wallet.balance - item.amount;

  await wallet.save();


  // Update Next Run Date

  let nextDate = new Date(item.nextRun);

  if (item.frequency === "daily") {
    nextDate.setDate(nextDate.getDate() + 1);
  }
  else if (item.frequency === "weekly") {
    nextDate.setDate(nextDate.getDate() + 7);
  }
  else {
    nextDate.setMonth(nextDate.getMonth() + 1);
  }

  item.nextRun = nextDate;


  // Stop recurring if endDate passed

  if (item.endDate && nextDate > item.endDate) {
    item.isActive = false;
  }

  await item.save();

}

console.log("✅ Recurring transactions processed");
```

} catch (error) {

```
console.error("❌ Recurring Cron Error:", error.message);
```

}

});

// ❌ Not Found Middleware

app.use(notFound);

// ⚠ Global Error Handler

app.use(errorHandler);

// 🚀 Start Server

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
console.log(`🚀 Server running on port ${PORT}`);
});
