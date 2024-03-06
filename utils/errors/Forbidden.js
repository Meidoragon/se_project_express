const { FORBIDDEN } = require('../statusCodes');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = FORBIDDEN;
    this.name = 'ForbiddenError';
  }
}

module.exports = ForbiddenError;
