const { CONFLICT } = require('../statusCodes');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = CONFLICT;
    this.name = 'ConflictError';
  }
}

module.exports = ConflictError;
