const router = require('express').Router();
const clothingItems = require('./clothingItems');
const user = require('./users');
const NotFoundError = require('../utils/errors/NotFound');

router.use('/items', clothingItems);
router.use('/users', user);

router.use((req, res, next) => {
  next(new NotFoundError('Data not found.'));
});

module.exports = router;
