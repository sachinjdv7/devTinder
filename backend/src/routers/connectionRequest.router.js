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
      const toUserId = req.params.toUserId;
      const status = req.params.status;

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

module.exports = {
  connectionRequestRouter,
};
