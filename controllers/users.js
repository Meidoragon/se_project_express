const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../utils/config');
const {
  createValidationError,
  createAuthError,
} = require('../utils/errors');
const { isAuthorized } = require('../utils/auth');

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
        res.status(SUCCESS).send({ avatar: user.avatar, name: user.name });
      }).catch((err) => {
        console.error('Error creating User: ', `${err}`);
        sendErrorResponse(res, err);
      });
    });
}

// Request
function getUsers(req, res) {
  console.info('getUsers request body: ', req.body);
  console.info('getUsers request params: ', req.params);
  if (!isAuthorized(req)) {
    sendErrorResponse(res, createAuthError());
  } else {
    User.find({}).then((users) => res.status(SUCCESS).send(users))
      .catch((err) => {
        console.error(`Error from getUsers: ${err}`);
        sendErrorResponse(res, err);
      });
  }
}

function getUser(req, res) {
  console.info('getUser request body: ', req.body);
  console.info('getUser request params: ', req.params);
  if (!isAuthorized(req)) {
    sendErrorResponse(res, createAuthError());
  } else {
    const { userId } = req.params;
    User.findById(userId).orFail()
      .then((user) => {
        res.status(SUCCESS).send({ data: user });
      })
      .catch((err) => {
        console.error(`Error from getUser: ${err}`);
        sendErrorResponse(res, err);
      });
  }
}

function getCurrentUser(req, res) {
  console.info(req);
  console.info('getCurrentUser request body: ', req.body);
  console.info('getCurrentUser request params: ', req.params);
  if (!isAuthorized(req)) {
    sendErrorResponse(res, createAuthError());
  } else {
    const userId = req.user._id;
    User.findById(userId)
      .orFail()
      .then((user) => {
        res.status(SUCCESS).send({ data: user });
      })
      .catch((err) => {
        console.error(`Error from getCurrentUser: ${err}`);
        sendErrorResponse(res, err);
      });
  }
}

function login(req, res) {
  console.info('Login attempt...');
  if (!('email' in req.body) || !('password' in req.body)) {
    console.info('login failed.');
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
  if (!isAuthorized(req)) {
    sendErrorResponse(res, createAuthError());
  } else {
    console.info(`Update user: ${req.user._id}`);
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
}

module.exports = {
  createUser,
  getCurrentUser,
  getUsers,
  getUser,
  login,
  updateProfile,
};
