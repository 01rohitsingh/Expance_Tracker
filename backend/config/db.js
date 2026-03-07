const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: false, // Production performance optimization
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Connection Events
    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB Disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("🔄 MongoDB Reconnected");
    });

  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;