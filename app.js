const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3001, BASE_PATH, DB } = process.env;
const app = express();

mongoose.connect(`mongodb://127.0.0.1:27017/${DB}`, () => {
  console.info(`Connected to DB: ${DB}`);
}, (e) => console.error(`DB error: ${e}`));

const routes = require('./routes');

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '6595fce79de40564cbbc62e7',
  };
  next();
});
app.use(routes);

app.listen(PORT, () => {
  console.log(`${BASE_PATH}:${PORT}`);
  console.log(`DB=${DB}`);
});
