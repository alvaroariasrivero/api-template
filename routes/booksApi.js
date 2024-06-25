const routes = require('express').Router();
const bookApi = require('../controllers/bookApi');

routes.get('/books', bookApi.getAllProducts);

module.exports = routes;