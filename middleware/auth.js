const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
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
  console.info(`before authorization check: ${authorization}`);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;
  console.info(`after extraction: ${token}`);
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.info('issue verifying token');
    return handleAuthError(res);
  }

  user.findById(payload).orFail()
    .then(() => {
      console.info(`after user ID found ${payload}`);
      req.user = payload;
      next();
    })
    .catch(() => {
      console.info(`after user ID not found ${payload}`);
      handleAuthError(res);
    });

  return null;
}

module.exports = { authorize };
