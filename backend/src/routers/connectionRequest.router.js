const mongoose = require('mongoose');
const express = require('express');
const connectionRequestRouter = express.Router();

const { ConnectionRequest, User } = require('../models');
const { userAuth } = require('../middlewares');

connectionRequestRouter.post(
  '/request/send/:status/:toUserId',
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const { toUserId, status } = req.params;

      const allowedStatus = ['intrested', 'ignored'];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: 'Invalid status: ' + status });
      }

      // check id toUserId is valid
      if (!mongoose.Types.ObjectId.isValid(toUserId)) {
        return res.status(400).json({ message: 'Invalid User ID' });
      }

      // Check if the user is trying to send a request to a user who is not registered
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Check if the user is trying to send a request to a user who is already a connection
      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId, status: 'intrested' },
          { fromUserId: toUserId, toUserId: fromUserId, status: 'intrested' },
        ],
      });
      if (existingRequest) {
        return res.status(400).json({ message: 'Request already sent by you' });
      }

      const user = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await user.save();

      res.status(201).json({
        message: `${req.user.firstName} sent ${status} request to ${toUser.firstName}`,
        data,
      });
    } catch (error) {
      res.status(400).send('Error' + error.message);
    }
  }
);

connectionRequestRouter.post(
  '/request/review/:status/:requestId',
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ['accepted', 'rejected'];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
      allowedStatus.includes(status);

      const connectionRequestExist = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: 'intrested',
      });
      console.log(connectionRequestExist);

      if (!connectionRequestExist) {
        const isSender = await ConnectionRequest.findOne({
          _id: requestId,
          fromUserId: loggedInUser._id,
        });

        if (isSender) {
          return res.status(403).json({
            message:
              'You are the sender of this connection request and cannot accept it.',
          });
        }
        return res
          .status(404)
          .json({ message: 'Connection request not found' });
      }
      connectionRequestExist.status = status;

      const data = await connectionRequestExist.save();

      res.status(200).json({
        message: `connection request ${status} successfully..`,
        data,
      });
    } catch (error) {
      res.status(400).send('Error' + error.message);
    }
  }
);

module.exports = {
  connectionRequestRouter,
};
