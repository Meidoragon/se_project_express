const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
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
// app.use((req, res, next) => {
//   req.user = {
//     _id: '6595fce79de40564cbbc62e7',
//   };
//   next();
// });
app.post('/signup', createUser);
app.post('/signin', login);
app.get('/items', getItems);
app.use(authorize);
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server open on ${BASE_PATH}:${PORT}`);
});
