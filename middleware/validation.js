const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

function validateURL(value, helpers) {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}

function validateEmail(value, helpers) {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error('string.email');
}

function validateIDComposition(value, helpers) {
  if (validator.isHexadecimal(value)) {
    return value;
  }
  return helpers.error('string.hex');
}

function validateWeather(value, helpers) {
  const weathers = [
    'hot',
    'warm',
    'cold',
  ];

  if (weathers.includes(value)) {
    return value;
  }
  return helpers.error('string.weather');
}

module.exports.validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of "name" field is 2',
        'string.max': 'The maximum length of "name" field is 30',
        'string.empty': 'The "name" field must be filled in',
      }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'The "imageUrl" field must be filled in',
      'string.uri': 'the "imageUrl" field must be a valid url',
    }),
    weather: Joi.string().required().custom(validateWeather)
      .messages({
        'string.empty': 'The "weather" field must be filled in',
        'string.weather': 'The "weather" field must contain either "hot", "cold", or "warm"',
      }),
  }),
});

module.exports.validateUserInfoBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of "name" field is 2',
        'string.max': 'The maximum length of "name" field is 30',
        'string.empty': 'The "name field must be filled in',
      }),
    avatar: Joi.string().required().custom(validateURL)
      .messages({
        'string.empty': 'The "avatar" field must be filled in',
        'string.uri': 'The "avatar" field must be a valid url',
      }),
    email: Joi.string().required().custom(validateEmail)
      .messages({
        'string.empty': 'The "email" field must be filled in',
        'string.email': 'The "email" field must be a valid email',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'The "password" field must be filled in',
      }),
  }),
});

module.exports.validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail)
      .messages({
        'string.empty': 'The "email" field must be filled in',
        'string.email': 'The "email" field must be a valid email',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'The "password" field must be filled in',
      }),
  }),
});

module.exports.validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of "name" field is 2',
        'string.max': 'The maximum length of "name" field is 30',
      }),
    avatar: Joi.string().custom(validateURL)
      .messages({
        'string.uri': 'The "avatar" field must be a valid url',
      }),
  }).or('name', 'avatar'), // we can allow one or both, but not neither
});

module.exports.validateID = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().min(24).max(24)
      .custom(validateIDComposition)
      .messages({
        'string.empty': 'The "id" field must be filled in',
        'string.min': 'The "id" field must be 24 characters',
        'string.max': 'The "id" field must be 24 characters',
        'string.hex': 'The "id" field must be valid hexadecimal',
      }),
  }),
});
