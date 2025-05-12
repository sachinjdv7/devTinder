const jwt = require('jsonwebtoken');
const { User } = require('../models');

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res.status(401).json({ message: 'Token expired, Login again' });

    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

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
