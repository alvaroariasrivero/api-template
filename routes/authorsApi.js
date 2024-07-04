const routes = require('express').Router();
const authorApi = require('../controllers/authorApi');
const loggedUser = require('../middlewares/verifiedToken');

routes.get('/authors', authorApi.getAllAuthors);
routes.get('/author', authorApi.getAuthorByLastname);
routes.post('/new-author', loggedUser, authorApi.createAuthor);

module.exports = routes;