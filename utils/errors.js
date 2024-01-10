const SUCCESS = 200;
const DATA_NOT_SENT = 204;
const INVALID_DATA = 400;
const DATA_NOT_FOUND = 404;
const DEFAULT = 500;

const sendErrorResponse = (res, err) => {
  if (err.name === 'CastError') {
    res.status(INVALID_DATA).send({ message: 'Invalid data.' });
  } else if (err.name === 'ValidationError') {
    res.status(INVALID_DATA).send({ message: 'Invalid data.' });
  } else if (err.name === 'DocumentNotFoundError') {
    res.status(DATA_NOT_FOUND).send({ message: 'Data not found.' });
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
