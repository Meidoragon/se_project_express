const router = require('express').Router();
const clothingItem = require('./clothingItems');
const user = require('./users');
const { DATA_NOT_FOUND } = require('../utils/errors');

router.use('/items', clothingItem);
router.use('/users', user);
router.use('/signup', user);

router.use((req, res) => {
  res.status(DATA_NOT_FOUND).send({ message: 'Data not found.' });
});

module.exports = router;
