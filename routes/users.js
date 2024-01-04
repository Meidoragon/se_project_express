const router = require('express').Router();
const {createUser, getUsers, getUser, updateUser, deleteUser} = require('../controllers/users');
//CRUD

//Create
router.post('/', createUser);

//Request
router.get('/', getUsers);
router.get('/:userId', getUser);
/*
//Update
router.put('/:userId', updateUser);

//Delete
router.delete('/:userId', deleteUser);
*/
module.exports = router;