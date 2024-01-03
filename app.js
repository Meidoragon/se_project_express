const express = require('express');
const mongoose = require('mongoose');

const {PORT = 3001, BASE_PATH, DB} = process.env;
const app = express();

mongoose.connect(`mongodb://127.0.0.1:27017/${DB}`);

app.listen(PORT, () => {
  console.log( `${BASE_PATH}:${PORT}`)
  console.log( `DB=${DB}`)
})
