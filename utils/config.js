require('dotenv').config();

let { JWT_SECRET } = process.env;
JWT_SECRET = JWT_SECRET || 'some-sensible-default';
module.exports = { JWT_SECRET };
