const { authRouter } = require('./auth.router');
const { profileRouter } = require('./profile.router');
const { connectionRequestRouter } = require('./connectionRequest.router');

module.exports = {
  authRouter,
  profileRouter,
  connectionRequestRouter,
};
