const { authRouter } = require('./auth.router');
const { profileRouter } = require('./profile.router');
const { connectionRequestRouter } = require('./connectionRequest.router');
const { userRouter } = require('./user.router');

module.exports = {
  authRouter,
  profileRouter,
  connectionRequestRouter,
  userRouter,
};
