const express = require('express');
const userRouter = express.Router();

const { userAuth } = require('../middlewares');
const { ConnectionRequest } = require('../models');

userRouter.get('/user/requrests/received', userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const getConnectionDetails = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: 'intrested',
    }).populate('fromUserId', ['firstName', 'lastName', 'photoUrl', 'skills']);
    res.status(200).json({
      message: 'Fetched connection request Successfully',
      data: getConnectionDetails,
    });
  } catch (error) {
    res.status(400).send('Error' + error.message);
  }
});

module.exports = {
  userRouter,
};
