const express = require('express');
const bcrypt = require('bcrypt');
const authRouter = express.Router();

const User = require('../models/user.model');
const { validateSignup } = require('../utils/validator');

authRouter.post('/signup', async (req, res) => {
  try {
    validateSignup(req);
    const { firstName, lastName, emailId, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
    await user.save();
    res.send('User added successfully in DB');
  } catch (error) {
    res.status(500).send('Error' + error.message);
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const isUserExist = await User.findOne({ emailId });

    if (!isUserExist) {
      throw new Error('Invalid Credentials');
    }

    const isValidPassword = await isUserExist.compareUserPassword(password);

    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    // Generating the token and gives the user id to hide
    const token = await isUserExist.getJWT();

    res.cookie('token', token, { expires: new Date(Date.now() + 900000) });
    res.send('User Login Successfully');
  } catch (error) {
    res.status(500).send('Error' + error.message);
  }
});

module.exports = {
  authRouter,
};
