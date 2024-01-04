const User = require('../models/user');

//CRUD

//Create
function createUser(req, res) {
  console.info("createUser request body: ", req.body);
  console.info("createUser request params: ", req.params);

  const {name, avatar} = req.body;
  User.create({name, avatar}).then((user) => {
    console.info("createUser response: ", user)
    res.status(200).send(user)
  }).catch((err) => {
      console.error("Error from createUser: ", err);
    })
}
//Request
function getUsers(req, res) {
  console.info("getUsers request body: ", req.body)
  console.info("getUsers request params: ", req.params);
  User.find({}).then((users) => res.status(200).send(users))
  .catch((err) => {
    res.status(500).send({message: `Error from getUsers: ${err}`});
  })
}

function getUser(req, res) {
  console.info("getUser request body: ", req.body);
  console.info("getUser request params: ", req.params);
  const {userId} = req.params;
  User.findById(userId).orFail()
    .then((user) => {
      res.status(200).send({data: user});
    })
    .catch((err) => {
      res.status(500).send({message: `Error from getUser: ${err}`});
    })
}

//Update
function updateUser(req, res) {

}
//Delete
function deleteUser(req, res) {

}

module.exports = {
  createUser,
  getUsers,
  getUser,
  /*updateUser,
  deleteUser*/
}