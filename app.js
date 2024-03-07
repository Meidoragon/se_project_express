const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { authorize } = require('./middleware/auth');
const validation = require('./middleware/validation');
const errorHandler = require('./middleware/errorHandler');
const {
  createUser,
  login,
} = require('./controllers/users');
const { getItems } = require('./controllers/clothingItems');

const {
  PORT,
  BASE_PATH,
  DB,
  DB_PORT,
} = process.env;

const app = express();
console.log(DB);
mongoose.connect(`mongodb://127.0.0.1:${DB_PORT}/${DB}`, () => {
  console.info(`Connected to DB: ${DB} on port ${DB_PORT}`);
}, (err) => console.error(`DB error: ${err}`));

const routes = require('./routes');

app.disable('x-powered-by');
app.use(express.json());
app.use((req, res, next) => {
  console.log(req);
  console.log(req.params);
  console.log(req.body);
  console.log('res=======================================================================================================');
  console.log(res);
  next();
});
app.use(helmet());
app.use(cors());
app.post('/signup', validation.validateUserInfoBody, createUser);
app.post('/signin', validation.validateUserLogin, login);
app.get('/items', getItems);
app.use(authorize);
app.use(routes);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server open on ${BASE_PATH}:${PORT}`);
});
