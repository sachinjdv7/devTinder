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

const validateProfileEdit = (req) => {
  const data = req.body;
  const ALLOWED_FIELD_TO_EDIT = [
    'firstName',
    'lastName',
    'gender',
    'photoUrl',
    'about',
    'skills',
    'age',
  ];
  const isEditAllowed = Object.keys(data).every((field) =>
    ALLOWED_FIELD_TO_EDIT.includes(field)
  );

  return isEditAllowed;
};

module.exports = {
  validateSignup,
  validateProfileEdit,
};
