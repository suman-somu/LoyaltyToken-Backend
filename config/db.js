const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/flipkart";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(URI);
    console.log("MongoDB Connected ✅");
  } catch (e) {
    console.log(`Authentication to database failed ❗`);
    process.exit(1);
  }
};

module.exports = connectDB;