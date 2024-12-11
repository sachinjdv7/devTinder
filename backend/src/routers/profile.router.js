const express = require('express');
const profileRouter = express.Router();

const { userAuth } = require('../middlewares');
const { validateProfileEdit } = require('../utils');

profileRouter.get('/profile/view', userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send('Error' + error.message);
  }
});

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
  // validate user body
  try {
    if (!validateProfileEdit(req)) throw new Error('Invalid edit user');

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.send({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (error) {
    res.status(500).send('Error' + error.message);
  }
});

module.exports = {
  profileRouter,
};
