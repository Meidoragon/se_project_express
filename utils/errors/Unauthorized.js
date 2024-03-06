const { UNAUTHORIZED } = require('../statusCodes');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = UNAUTHORIZED;
    this.name = 'UnauthorizedError';
  }
}

module.exports = UnauthorizedError;
