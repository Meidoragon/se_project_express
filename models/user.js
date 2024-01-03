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
      message: 'You must enter a valid URL',
    }
  }
})



module.exports = mongoose.model('user', userSchema)