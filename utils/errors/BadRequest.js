const { BAD_REQUEST } = require('../statusCodes');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = BAD_REQUEST;
    this.name = 'BadRequestError';
  }
}

module.exports = BadRequestError;
