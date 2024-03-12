const ClothingItem = require('../models/clothingItem');
const { SUCCESS } = require('../utils/statusCodes');
// const UnauthorizedError = require('../utils/errors/Unauthorized');
const ForbiddenError = require('../utils/errors/Forbidden');
const BadRequestError = require('../utils/errors/BadRequest');
const NotFoundError = require('../utils/errors/NotFound');

const createItem = (req, res, next) => {
  console.info('createItem request body: ', req.body);
  console.info('createItem request params: ', req.params);
  console.info('createItem user id: ', req.user._id);

  const { name, weather, imageUrl } = req.body;
  const userId = req.user._id;
  ClothingItem.create({
    name, weather, imageUrl, owner: userId,
  }).then((item) => {
    console.info(item);
    res.status(SUCCESS).send({ data: item });
  }).catch((err) => {
    console.error('createItem error response: ', `${err}`);
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  });
};

const getItems = (req, res, next) => {
  console.info('getItems request body: ', req.body);
  console.info('getItems request params: ', req.params);
  // console.info('getItems user id: ', req.user._id);

  ClothingItem.find({}).then((items) => {
    console.info(items);
    res.status(SUCCESS).send(items);
  })
    .catch((err) => {
      console.error('getItems error response: ', `${err}`);
      // sendErrorResponse(res, err);
      next(err);
    });
};

const deleteItem = (req, res, next) => {
  // TODO: Find a better way to handle this nested monstrosity.
  console.info('deleteItem request body: ', req.body);
  console.info('deleteItem request params: ', req.params);
  console.info('deleteItem user id: ', req.user._id);

  const { id } = req.params;
  ClothingItem.findOne({ _id: id })
    .orFail()
    .then((validateItem) => {
      const ownerId = validateItem.owner.valueOf();
      console.log(`ownerId: ${ownerId}`);
      if (!(ownerId === req.user._id)) {
        console.error(`${validateItem.owner} !== ${req.user._id}`);
        next(new ForbiddenError('No permissions to delete this item'));
      } else {
        console.info(`deleteItem: ${id}`);
        ClothingItem.findByIdAndDelete(id)
          .orFail()
          .then((item) => {
            res.status(SUCCESS).send(item);
          })
          .catch((err) => {
            console.error('deleteItem error response: ', `${err}`);
            next(err);
          });
      }
    })
    .catch((err) => {
      console.error('deleteItem error response: ', `${err}`);
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid item id'));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Item not found.'));
      } else {
        next(err);
      }
    });
};

const likeItem = (req, res, next) => {
  console.info('likeItem request body: ', req.body);
  console.info('likeItem request params: ', req.params);
  console.info('likeItem user id: ', req.user._id);

  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then((item) => res.status(SUCCESS).send(item))
    .catch((err) => {
      console.error('likeItem error response: ', `${err}`);
      // sendErrorResponse(res, err);
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid item id'));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Item not found.'));
      } else {
        next(err);
      }
    });
};

const dislikeItem = (req, res, next) => {
  console.info('dislikeItem request body: ', req.body);
  console.info('dislikeItem request params: ', req.params);
  console.info('dislikeItem user id: ', req.user._id);

  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail()
    .then((item) => res.status(SUCCESS).send(item))
    .catch((err) => {
      console.error('dislikeItem error response: ', `${err}`);
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid item id'));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Item not found.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createItem,
  getItems,
  likeItem,
  dislikeItem,
  deleteItem,
};
