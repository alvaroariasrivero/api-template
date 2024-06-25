const mongoose = require('mongoose');
const Author = require ('./author');

const objectSchema = {
    titulo: "String",
    isbn: "String",
    paginas: "Number",
    genero: "String",
    id_autor: { type: mongoose.Schema.ObjectId, ref: Author }
};

const bookSchema = mongoose.Schema(objectSchema);

const Book = mongoose.model('Libros', bookSchema);

module.exports = Book;
