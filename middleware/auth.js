const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const user = require('../models/user');
// const {
//   createAuthenticationError,
//   sendErrorResponse,
// } = require('../utils/errors');

const UnauthorizedError = require('../utils/errors/Unauthorized');

// function handleAuthError(res) {
//   sendErrorResponse(res, createAuthenticationError());
// }

function extractBearerToken(header) {
  return header.replace('Bearer ', '');
}

function authorize(req, res, next) {
  console.info(req.headers.authorization);
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Authorization Error: Invalid jwt format'));
  }

  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error('Error validating token');
    if (err.name === 'TokenExpiredError') {
      next(new UnauthorizedError('Authorization Error: jwt expired'));
    } else {
      next(err);
    }
  }

  user.findById(payload)
    .orFail()
    .then(() => {
      req.user = payload;
      next();
    })
    .catch((err) => {
      next(err);
    });

  return null;
}

module.exports = { authorize };
