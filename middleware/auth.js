const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = require('../utils/config');
const user = require('../models/user');
const {
  createAuthError,
  sendErrorResponse,
} = require('../utils/errors');

function handleAuthError(res) {
  sendErrorResponse(res, createAuthError());
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
    payload = jwt.verify(token, JWT_TOKEN);
  } catch (err) {
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
