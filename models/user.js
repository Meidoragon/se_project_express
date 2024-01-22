const mongoose = require('mongoose');
const validator = require('validator');

const user = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    required: true,
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'ERROR: User avatar must be a valid URL',
    },
  },
  email: {
    required: true,
    type: String,
    unique: true,
    dropDups: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'ERROR: User email must be a valid email',
    },
  },
  password: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('user', user);
