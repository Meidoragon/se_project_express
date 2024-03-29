const router = require('express').Router();
const validate = require('../middleware/validation');
const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', validate.validateUserUpdate, updateProfile);
module.exports = router;
