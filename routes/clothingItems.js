const router = require('express').Router();
const validate = require('../middleware/validation');

const {
  createItem,
  likeItem,
  dislikeItem,
  deleteItem,
} = require('../controllers/clothingItems');

// CRUD

// // Create
router.post('/', validate.validateCardBody, createItem);

// // Update
router.put('/:id/likes', validate.validateID, likeItem);

// // Delete
router.delete('/:id', validate.validateID, deleteItem);
router.delete('/:id/likes', validate.validateID, dislikeItem);

module.exports = router;
