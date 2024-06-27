const routes = require('express').Router();
const authorApi = require('../controllers/authorApi');

routes.get('/authors', authorApi.getAllAuthors);
routes.get('/author', authorApi.getAuthorByLastname);
routes.post('/new-author', authorApi.createAuthor);

module.exports = routes;