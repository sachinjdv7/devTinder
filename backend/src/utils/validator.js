const validator = require('validator');

const validateSignup = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName && !lastName) {
    throw new Error('firstName and lastName required');
  } else if (!validator.isEmail(emailId)) {
    throw new Error('Required valid email');
  } else if (!validator.isStrongPassword(password)) {
    throw new Error('Enter a strong a password');
  }
};

module.exports = {
  validateSignup,
};
