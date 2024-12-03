const express = require('express');
const { connectDb } = require('./config/database');
const app = express();
const PORT = 8082;

connectDb()
  .then(() => {
    app.on('error', (error) => {
      console.log('Express server connection failed ', error);
    });
    app.listen(PORT, () => {
      console.log(`🚀 Express server is listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Connection failed to connect MongoDB', error);
  });
