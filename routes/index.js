const router = require('express').Router();
const clothingItems = require('./clothingItems');
const user = require('./users');
const { DATA_NOT_FOUND } = require('../utils/errors');

router.use('/items', clothingItems);
router.use('/users', user);

router.use((req, res) => {
  res.status(DATA_NOT_FOUND).send({ message: 'Data not found.' });
});

module.exports = router;
