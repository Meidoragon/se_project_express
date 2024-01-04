const User = require('../models/user');
const {
  SUCCESS,
  sendErrorResponse,
} = require('../utils/errors');
// CRUD

// Create
function createUser(req, res) {
  console.info('createUser request body: ', req.body);
  console.info('createUser request params: ', req.params);

  const { name, avatar } = req.body;
  User.create({ name, avatar }).then((user) => {
    console.info('createUser response: ', user);
    res.status(SUCCESS).send(user);
  }).catch((err) => {
    console.error('Error from createUser: ', `${err}`);
    sendErrorResponse(res, err);
  });
}
// Request
function getUsers(req, res) {
  console.info('getUsers request body: ', req.body);
  console.info('getUsers request params: ', req.params);
  User.find({}).then((users) => res.status(SUCCESS).send(users))
    .catch((err) => {
      console.error(`Error from getUsers: ${err}`);
      sendErrorResponse(res, err);
    });
}

function getUser(req, res) {
  console.info('getUser request body: ', req.body);
  console.info('getUser request params: ', req.params);
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

module.exports = {
  createUser,
  getUsers,
  getUser,
};
