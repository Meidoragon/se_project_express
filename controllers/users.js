const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../utils/config');
const {
  createValidationError,
} = require('../utils/errors');
// const { isAuthorized } = require('../utils/auth');

const {
  SUCCESS,
  sendErrorResponse,
} = require('../utils/errors');
// CRUD

// Create
function createUser(req, res) {
  console.info('createUser request body: ', req.body);
  console.info('createUser request params: ', req.params);

  const {
    name,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        avatar,
        email,
        password: hash,
      }).then((user) => {
        console.info('createUser response : ', user);
        res.status(SUCCESS).send({ avatar: user.avatar, name: user.name, email: user.email });
      }).catch((err) => {
        console.error('Error creating User: ', `${err}`);
        sendErrorResponse(res, err);
      });
    })
    .catch((err) => {
      console.error('Error hashing password: ');
      console.error(err);
      sendErrorResponse(res, err);
    });
}

// Request
function getCurrentUser(req, res) {
  console.info(req);
  console.info('getCurrentUser: ', req.user._id);
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      console.info(user);
      res.status(SUCCESS).send({ data: user });
    })
    .catch((err) => {
      console.error(`Error from getCurrentUser: ${err}`);
      sendErrorResponse(res, err);
    });
}

function login(req, res) {
  console.info('Login attempt...');
  if (!('email' in req.body) || !('password' in req.body)) {
    console.info('login failed.');
    console.info('no email or password');
    sendErrorResponse(res, createValidationError());
  } else {
    User.findUserByCredentials(req.body.email, req.body.password)
      .then((user) => {
        const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
          expiresIn: '7d',
        });
        console.info('login success.');
        res.status(SUCCESS).send({ token });
      })
      .catch((err) => {
        console.info('login failed.');
        sendErrorResponse(res, err);
      });
  }
}

function updateProfile(req, res) {
  console.info(`Update user: ${req.user._id}`);
  console.info(req.body);
  const userId = { _id: req.user._id };
  const update = { name: req.body.name, avatar: req.body.avatar };
  const options = {
    new: true,
    runValidators: true,
  };
  User.findOneAndUpdate(userId, update, options)
    .then((newUser) => {
      console.info('Success. New user is: ');
      console.info(newUser);
      res.status(SUCCESS).send({ data: newUser });
    })
    .catch((err) => {
      console.info('Update failed');
      sendErrorResponse(res, err);
    });
}

module.exports = {
  createUser,
  getCurrentUser,
  login,
  updateProfile,
};
