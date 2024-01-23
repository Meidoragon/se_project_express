const router = require('express').Router();
const {
  getCurrentUser,
  // createUser,
  // getUsers,
  // getUser,
  updateProfile,
} = require('../controllers/users');
// CRUD

// // Create
// router.post('/', createUser);
//
// // Request
// router.get('/', getUsers);
// router.get('/:userId', getUser);
router.get('/me', getCurrentUser);
router.patch('/me', updateProfile);
module.exports = router;
