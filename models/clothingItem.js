const mongoose = require('mongoose');
const validator = require('validator');
const clothingItem = new mongoose.Schema ({
  name: {
    required: true,
    type: String,
    // minLength: 2,
    // maxLength: 30,
  },
  weather: {
    type: String,
    required: true,
    enum: ['hot', 'warm', 'cold'],
    },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'ERROR: Clothing image must be a valid URL',
    }
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now()
  // },
  // owner: {
  //   type: mongoose.Schema.Types.user,
  //   required: true,
  // },
  // like: [mongoose.Schema.Types.user],
  },
)



module.exports = mongoose.model('clothingItem', clothingItem)