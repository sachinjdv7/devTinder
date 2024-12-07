const express = require('express');
const userRouter = express.Router();

const { userAuth } = require('../middlewares');
const { ConnectionRequest } = require('../models');

userRouter.get('/user/requests/received', userAuth, async (req, res) => {
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

userRouter.get('/user/connections/match', userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionMatchUser = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: 'accepted' },
        { fromUserId: loggedInUser._id, status: 'accepted' },
      ],
    })
      .populate('fromUserId', ['firstName', 'lastName', 'photoUrl', 'skills'])
      .populate('toUserId', ['firstName', 'lastName', 'photoUrl', 'skills']);

    const data = connectionMatchUser.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.status(200).json({
      message: `${data.length} Matched Connections feteched successfully`,
      data,
    });
  } catch (error) {
    res.status(400).send('Error' + error.message);
  }
});

module.exports = {
  userRouter,
};
