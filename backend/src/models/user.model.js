const { Schema, model } = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      maxLength: 50,
      trim: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Enter a valid emailId' + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error('Enter a strong password' + value);
        }
      },
    },
    gender: {
      type: String,
      validate(value) {
        if (!['male', 'female', 'others'].includes(value)) {
          throw new Error('Gender is not valid');
        }
      },
    },
    photoUrl: {
      type: String,
      default: 'https://geographyandyou.com/images/user-profile.png',
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error('Enter a valid URL' + value);
        }
      },
    },
    about: {
      type: String,
      default: 'This is the default message about the user',
    },
    skills: {
      type: [String],
    },
    age: {
      type: Number,
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const token = await jwt.sign({ _id: this._id }, 'Secret@123', {
    expiresIn: '1d',
  });
  return token;
};

userSchema.methods.compareUserPassword = async function (userIncomingPasswod) {
  const isValidPassword = bcrypt.compare(userIncomingPasswod, this.password);
  return isValidPassword;
};

const User = model('User', userSchema);

module.exports = {
  User,
};
