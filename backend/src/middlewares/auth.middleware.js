const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) throw new Error('Token is not valid');

    const { _id } = jwt.verify(token, 'Secret@123');

    const user = await User.findById(_id);

    if (!user) throw new Error('User not found');

    req.user = user;

    next();
  } catch (error) {
    res.status(400).send('Error' + error.message);
  }
};

module.exports = {
  userAuth,
};
