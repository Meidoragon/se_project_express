const { NOT_FOUND } = require('../statusCodes');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = NOT_FOUND;
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
