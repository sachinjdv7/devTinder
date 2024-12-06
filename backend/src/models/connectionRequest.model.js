const { Schema, model } = require('mongoose');

const connectionRequestSchema = new Schema(
  {
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
      required: true,
      enum: {
        values: ['intrested', 'accepted', 'ignored', 'rejected'],
        message: '{VALUE} is not supported',
      },
    },
  },
  { timestamps: true }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

connectionRequestSchema.pre('save', function (next) {
  //check if the fromUserId and toUserId are the same
  if (this.fromUserId.equals(this.toUserId)) {
    throw new Error('you cannot send a request to yourself');
  }
  next();
});

const ConnectionRequest = model('ConnectionRequest', connectionRequestSchema);

module.exports = {
  ConnectionRequest,
};
