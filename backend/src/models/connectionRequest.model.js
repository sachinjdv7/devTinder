const { Schema, model } = require('mongoose');

const connectionRequestSchema = new Schema({
  fromUserId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  toUserId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ['intrested', 'accepted', 'ignored', 'rejected'],
      message: '{VALUE} is not supported',
    },
  },
});

const ConnectionRequest = model('ConnectionRequest', connectionRequestSchema);

module.exports = {
  ConnectionRequest,
};
