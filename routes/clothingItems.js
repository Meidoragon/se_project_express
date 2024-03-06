const router = require('express').Router();

const {
  createItem,
  likeItem,
  dislikeItem,
  deleteItem,
} = require('../controllers/clothingItems');

// CRUD

// // Create
router.post('/', createItem);

// // Update
router.put('/:itemId/likes', likeItem);

// // Delete
router.delete('/:itemId', deleteItem);
router.delete('/:itemId/likes', dislikeItem);

module.exports = router;
