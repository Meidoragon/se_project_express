const User = require('../models/user');

//CRUD

//Create
function createUser(req, res) {
  console.info("createUser request: ", req);

  const {name, avatar} = req.body;
  User.create({name, avatar}).then((user) => {
    console.info("createUser response: ", user)
    res.status(200).send(user)
  }).catch((err) => {
      console.error("Error from createUser: ", err);
    })
}
//Request
function getUsers() {

}

function getUser() {

}

//Update
function updateUser() {

}
//Delete
function deleteUser() {

}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
}