const ClothingItem = require('../models/clothingItem');
const {
  SUCCESS,
  createAuthorizationError,
  sendErrorResponse,
} = require('../utils/errors');

const createItem = (req, res) => {
  console.info('createItem request body: ', req.body);
  console.info('createItem request params: ', req.params);
  console.info('createItem user id: ', req.user._id);

  const { name, weather, link } = req.body;
  const userId = req.user._id;
  ClothingItem.create({
    name, weather, link, owner: userId,
  }).then((item) => {
    console.info(item);
    res.status(SUCCESS).send({ data: item });
  }).catch((err) => {
    console.error('createItem error response: ', `${err}`);
    sendErrorResponse(res, err);
  });
};

const getItems = (req, res) => {
  console.info('getItems request body: ', req.body);
  console.info('getItems request params: ', req.params);
  // console.info('getItems user id: ', req.user._id);

  ClothingItem.find({}).then((items) => {
    console.info(items);
    res.status(SUCCESS).send(items);
  })
    .catch((err) => {
      console.error('getItems error response: ', `${err}`);
      sendErrorResponse(res, err);
    });
};

const deleteItem = (req, res) => {
  // TODO: Find a better way to handle this nested monstrosity.
  console.info('deleteItem request body: ', req.body);
  console.info('deleteItem request params: ', req.params);
  console.info('deleteItem user id: ', req.user._id);

  const { itemId } = req.params;
  ClothingItem.findOne({ _id: itemId })
    .orFail()
    .then((validateItem) => {
      const ownerId = validateItem.owner.valueOf();
      console.log(`ownerId: ${ownerId}`);
      if (!(ownerId === req.user._id)) {
        console.error(`${validateItem.owner} !== ${req.user._id}`);
        const err = createAuthorizationError('Validation failed');
        sendErrorResponse(res, err);
      } else {
        console.info(`deleteItem: ${itemId}`);
        ClothingItem.findByIdAndDelete(itemId)
          .orFail()
          .then((item) => {
            res.status(SUCCESS).send(item);
          })
          .catch((err) => {
            console.error('deleteItem error response: ', `${err}`);
            sendErrorResponse(res, err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      sendErrorResponse(res, err);
    });
};

const likeItem = (req, res) => {
  console.info('likeItem request body: ', req.body);
  console.info('likeItem request params: ', req.params);
  console.info('likeItem user id: ', req.user._id);

  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then((item) => res.status(SUCCESS).send(item))
    .catch((err) => {
      console.error('likeItem error response: ', `${err}`);
      sendErrorResponse(res, err);
    });
};

const dislikeItem = (req, res) => {
  console.info('dislikeItem request body: ', req.body);
  console.info('dislikeItem request params: ', req.params);
  console.info('dislikeItem user id: ', req.user._id);

  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then((item) => res.status(SUCCESS).send(item))
    .catch((err) => {
      console.error('dislikeItem error response: ', `${err}`);
      sendErrorResponse(res, err);
    });
};

module.exports = {
  createItem,
  getItems,
  likeItem,
  dislikeItem,
  deleteItem,
};
