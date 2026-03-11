require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cron = require("node-cron");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const walletRoutes = require("./routes/walletRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const recurringRoutes = require("./routes/recurringRoutes");

// ⭐ NEW ROUTE
const notificationRoutes = require("./routes/notificationRoutes");

const Recurring = require("./models/Recurring");
const Transaction = require("./models/Transaction");
const Wallet = require("./models/Wallet");

const app = express();


// CONNECT DATABASE
connectDB();


// SECURITY
app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);


// CORS
app.use(
  cors({
    origin: "*"
  })
);


// BODY PARSER
app.use(express.json());


// LOGGER
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


// TEST ROUTE
app.get("/", (req, res) => {
  res.send("🚀 FinTrack API Running...");
});


// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/recurring", recurringRoutes);

// ⭐ NOTIFICATION ROUTE
app.use("/api/notifications", notificationRoutes);


// ERROR HANDLING
app.use(notFound);
app.use(errorHandler);


// PORT
const PORT = process.env.PORT || 8000;


// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});