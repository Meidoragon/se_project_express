const SUCCESS = 200;
const DATA_NOT_SENT = 204;
const INVALID_DATA = 400;
const INVALID_AUTHENTICATION = 401;
const DATA_NOT_FOUND = 404;
const DATA_CONFLICT = 409;
const DEFAULT = 500;

const sendErrorResponse = (res, err) => {
  // console.info(err.name);
  // console.info(err);
  // TODO? use `err` to further separate errors to provide more usable information.
  // somewhat similar to how MongoServerError responds.
  // AuthenticationError should still be vague to prevent leaking unnecessary information.
  const errors = {
    CastError: () => res.status(INVALID_DATA).send({ message: 'Invalid data (cast)' }),
    ValidationError: () => res.status(INVALID_DATA).send({ message: 'Invalid data (validation)' }),
    AuthenticationError: () => res.status(INVALID_AUTHENTICATION).send({ message: 'Incorrect email or password.' }),
    DocumentNotFoundError: () => res.status(DATA_NOT_FOUND).send({ message: 'Data not found ' }),
    MongoServerError: () => res.status(DATA_CONFLICT).send({ message: `${err.keyValue.email} already exists` }),
  };

  if (err.name in errors) {
    errors[err.name]();
  } else {
    res.status(DEFAULT).send({ message: 'Server error.' });
  }
};

const createAuthError = () => {
  const err = new Error('Authentication error');
  err.name = 'AuthenticationError';
  return err;
};

const createValidationError = () => {
  const err = new Error('Validation error');
  err.name = 'ValidationError';
  return err;
};

module.exports = {
  SUCCESS,
  DATA_NOT_SENT,
  INVALID_DATA,
  DATA_NOT_FOUND,
  DEFAULT,
  createAuthError,
  createValidationError,
  sendErrorResponse,
};
