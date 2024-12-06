const express = require('express');
const connectionRequestRouter = express.Router();

const { ConnectionRequest } = require('../models');
const { userAuth } = require('../middlewares');

connectionRequestRouter.post(
  '/request/send/:status/:toUserId',
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const user = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      await user.save();
    } catch (error) {
      res.status(400).send('Error' + error.message);
    }
  }
);

module.exports = {
  connectionRequestRouter,
};
