const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      'mongodb://127.0.0.1:27017/devTinder'
    );
    console.log(
      `\n🚀 MongoDB connected DB HOST: ${connectionInstance.connection.host} `
    );
  } catch (error) {
    console.log('MongoDB connection Failed:', error);
    process.exit(1);
  }
};

module.exports = { connectDb };
