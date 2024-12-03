const express = require('express');
const { connectDb } = require('./config/database');
const app = express();
const PORT = 8082;

const User = require('./models/user.model');
app.post('/signup', async (req, res) => {
  const user = new User({
    firstName: 'sachin',
    lastName: 'jadhav',
    emailId: 'sachin@gmail.com',
    password: 'sdafasdf3545',
  });

  try {
    await user.save();
    res.send('User added successfully in DB');
  } catch (error) {
    res.status(400).send('Failed to save user', error.message);
  }
});

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
