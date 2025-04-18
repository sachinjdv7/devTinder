const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      "mongodb+srv://sachinjdv7:sachin123@cluster0.xh9em6m.mongodb.net/devTinder"
    );
    console.log(
      `\n🚀 MongoDB connected DB HOST: ${connectionInstance.connection.host} `
    );
  } catch (error) {
    console.log("MongoDB connection Failed:", error);
    process.exit(1);
  }
};

module.exports = { connectDb };
