const routes = require('express').Router();
const bookApi = require('../controllers/bookApi');

routes.get('/books', bookApi.getAllBooks);
routes.get('/books-by-author', bookApi.getBooksByAuthorLastName);
routes.get('/book', bookApi.getBooksByTitle);

module.exports = routes;