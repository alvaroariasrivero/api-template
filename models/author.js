const mongoose = require('mongoose');

const objectSchema = {
  nombre: {
    type: "String",
    required: true
  },
  apellidos: {
    type: "String",
    required: true
  }
};

const authorSchema = mongoose.Schema(objectSchema);

const Author = mongoose.model('Autores', authorSchema);

module.exports = Author;