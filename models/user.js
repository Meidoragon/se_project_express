const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.schema ({
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
    }
  }
})



module.exports = mongoose.model('user', userSchema)