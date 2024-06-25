const mongoose = require('mongoose');

const objectSchema = {
    nombre: "String",
    apellidos: "String"
};

const authorSchema = mongoose.Schema(objectSchema);

const Author = mongoose.model('Autores', authorSchema);

module.exports = Author;