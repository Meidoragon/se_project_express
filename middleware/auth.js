const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const user = require('../models/user');
const {
  createAuthenticationError,
  sendErrorResponse,
} = require('../utils/errors');

function handleAuthError(res) {
  sendErrorResponse(res, createAuthenticationError());
}

function extractBearerToken(header) {
  return header.replace('Bearer ', '');
}

function authorize(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.info('issue verifying token');
    return handleAuthError(res);
  }

  user.findById(payload).orFail()
    .then(() => {
      req.user = payload;
      next();
    })
    .catch(() => {
      handleAuthError(res);
    });

  return null;
}

module.exports = { authorize };
