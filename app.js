const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const {
  PORT,
  BASE_PATH,
  DB,
  DB_PORT,
} = process.env;
console.log(DB);
const app = express();

mongoose.connect(`mongodb://127.0.0.1:${DB_PORT}/${DB}`, () => {
  console.info(`Connected to DB: ${DB} on port ${DB_PORT}`);
}, (e) => console.error(`DB error: ${e}`));

const routes = require('./routes');

app.disable('x-powered-by');
app.use(express.json());
app.use(helmet());
app.use((req, res, next) => {
  req.user = {
    _id: '6595fce79de40564cbbc62e7',
  };
  next();
});
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server open on ${BASE_PATH}:${PORT}`);
});
