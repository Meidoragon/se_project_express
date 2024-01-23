const router = require('express').Router();
const {
  getCurrentUser,
  // createUser,
  // getUsers,
  // getUser,
} = require('../controllers/users');
// CRUD

// // Create
// router.post('/', createUser);
//
// // Request
// router.get('/', getUsers);
// router.get('/:userId', getUser);
router.get('/me', getCurrentUser);
module.exports = router;
