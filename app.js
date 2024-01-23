const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { authorize } = require('./middleware/auth');
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
app.use(helmet());
app.use(cors());
app.post('/signup', createUser);
app.post('/signin', login);
app.get('/items', getItems);
app.use(authorize);
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server open on ${BASE_PATH}:${PORT}`);
});
