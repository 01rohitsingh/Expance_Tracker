require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const walletRoutes = require("./routes/walletRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const recurringRoutes = require("./routes/recurringRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();


// CONNECT DATABASE
connectDB();


// ⭐ SECURITY
app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);


// ⭐ BODY PARSER (limit added)
app.use(express.json({ limit: "1mb" }));


// ⭐ CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);


// ⭐ LOGGER (dev only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("🚀 FinTrack API Running...");
});


// ⭐ API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/recurring", recurringRoutes);
app.use("/api/notifications", notificationRoutes);


// ⭐ ERROR HANDLING
app.use(notFound);
app.use(errorHandler);


// SERVER
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});