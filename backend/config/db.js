const mongoose = require("mongoose");

const connectDB = async () => {
  try {

    const conn = await mongoose.connect(process.env.MONGO_URI, {

      // ⭐ Performance options
      autoIndex: false,
      maxPoolSize: 10,       // connection pooling
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4              // faster DNS

    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

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