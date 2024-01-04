const SUCCESS = 200;
const DATA_NOT_SENT = 204;
const INVALID_DATA = 400;
const DATA_NOT_FOUND = 404;
const DEFAULT = 500;

const sendErrorResponse = (res, err) => {
  // something something error enum
  // something something rust match statement

  if (err.name === 'CastError') {
    res.status(INVALID_DATA).send({ message: `${err}` });
  } else if (err.name === 'ValidationError') {
    res.status(INVALID_DATA).send({ message: `${err}` });
  } else if (err.name === 'DocumentNotFoundError') {
    res.status(DATA_NOT_FOUND).send({ message: `${err}` });
  } else {
    res.status(500).send({ message: `${err}` });
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
