const express = require('express');
const userRouter = express.Router();

const { userAuth } = require('../middlewares');
const { ConnectionRequest, User } = require('../models');

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

userRouter.get('/feed', userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select(['fromUserId', 'toUserId']);

    const hideUserFeed = new Set();

    connectionRequests.forEach((req) => {
      hideUserFeed.add(req.fromUserId.toString());
      hideUserFeed.add(req.toUserId.toString());
    });

    const user = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(['firstName', 'lastName', 'photoUrl', 'skills'])
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      message: `${user.length} fetched successfully `,
      data: user,
    });
  } catch (error) {
    res.status(400).send('Error' + error.message);
  }
});

module.exports = {
  userRouter,
};
