const mongoose = require('mongoose');
const Author = require ('./author');

const objectSchema = {
  titulo: {
    type: "String",
    required: true
  },
  isbn: {
    type: "String",
    required: true
  },
  paginas: {
    type: "Number",
    required: true
  },
  genero: {
    type: "String",
    required: true
  },
  id_autor: { 
    type: mongoose.Schema.ObjectId, 
    ref: Author, 
    required: true
  }
};

const bookSchema = mongoose.Schema(objectSchema);

const Book = mongoose.model('Libros', bookSchema);

module.exports = Book;
