const routes = require('express').Router();
const bookApi = require('../controllers/bookApi');

routes.get('/books', bookApi.getAllBooks);
routes.get('/booksByAuthor', bookApi.getBooksByAuthorLastName);

module.exports = routes;