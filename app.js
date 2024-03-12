const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { authorize } = require('./middleware/auth');
const validation = require('./middleware/validation');
const errorHandler = require('./middleware/errorHandler');
const limiter = require('./middleware/limiter');
const {
  createUser,
  login,
} = require('./controllers/users');
const { getItems } = require('./controllers/clothingItems');
const {
  requestLogger,
  errorLogger,
} = require('./middleware/logger');

const {
  PORT = '3001',
  BASE_PATH = '127.0.0.1',
  DB = 'wtwr_prod',
  DB_PORT = '27017',
} = process.env;

const app = express();
console.log(DB);
mongoose.connect(`mongodb://127.0.0.1:${DB_PORT}/${DB}`, () => {
  console.info(`Connected to DB: ${DB} on port ${DB_PORT}`);
}, (err) => console.error(`DB error: ${err}`));

const routes = require('./routes');

app.disable('x-powered-by');
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(requestLogger);
app.use(limiter);
app.post('/signup', validation.validateUserInfoBody, createUser);
app.post('/signin', validation.validateUserLogin, login);
app.get('/items', getItems);
app.use(authorize);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server open on ${BASE_PATH}:${PORT}`);
});
