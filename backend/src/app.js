const express = require('express');
const cookieParser = require('cookie-parser');
const { connectDb } = require('./config/database');

const app = express();
const PORT = 8082;

// middlewares
app.use(express.json());
app.use(cookieParser());

// Routers
const { authRouter } = require('./routers/auth.router');
const { profileRouter } = require('./routers/profile.router');

app.use('/', authRouter);
app.use('/', profileRouter);

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
