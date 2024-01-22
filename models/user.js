const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { createAuthError } = require('../utils/errors');

const userSchema = new mongoose.Schema({
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

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  // TODO? validate email before searching DB?
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        console.info('email not found');
        const err = createAuthError();
        return Promise.reject(err);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            console.info('invalid password');
            const err = createAuthError();
            return Promise.reject(err);
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
