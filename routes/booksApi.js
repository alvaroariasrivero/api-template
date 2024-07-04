const routes = require('express').Router();
const bookApi = require('../controllers/bookApi');
const loggedUser = require('../middlewares/verifiedToken');

routes.get('/books', bookApi.getAllBooks);
routes.get('/books-by-author', bookApi.getBooksByAuthorLastName);
routes.get('/book', bookApi.getBooksByTitle);
routes.post('/new-book', loggedUser, bookApi.createBook);

module.exports = routes;