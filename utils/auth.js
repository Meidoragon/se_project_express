function isAuthorized(req) {
  return '_id' in req.user;
}

module.exports = {
  isAuthorized,
};
