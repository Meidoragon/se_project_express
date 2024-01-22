const SUCCESS = 200;
const DATA_NOT_SENT = 204;
const INVALID_DATA = 400;
const DATA_NOT_FOUND = 404;
const DATA_CONFLICT = 409;
const DEFAULT = 500;

const sendErrorResponse = (res, err) => {
  const errors = {
    CastError: () => res.status(INVALID_DATA).send({ message: 'Invalid data' }),
    ValidationError: () => res.status(INVALID_DATA).send({ message: 'Invalid data' }),
    DocumentNotFoundError: () => res.status(DATA_NOT_FOUND).send({ message: 'Data not found ' }),
    MongoServerError: () => res.status(DATA_CONFLICT).send({ message: `${err.keyValue.email} already exists` }),
  };

  if (err.name in errors) {
    errors[err.name]();
  } else {
    res.status(DEFAULT).send({ message: 'Server error.' });
  }
};

module.exports = {
  SUCCESS,
  DATA_NOT_SENT,
  INVALID_DATA,
  DATA_NOT_FOUND,
  DEFAULT,
  sendErrorResponse,
};
