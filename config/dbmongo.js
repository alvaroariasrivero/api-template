const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/Biblioteca';

mongoose.connect(url)
  .then(() => console.log("DB connected"))
  .catch(error => console.log(error));

const db = mongoose.connection;

db.on("error", error => console.log(error));

module.exports = mongoose;
