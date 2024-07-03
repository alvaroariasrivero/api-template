const routes = require('express').Router();
const userApi = require('../controllers/userApi');
const isAdmin = require('../middlewares/isAdmin');
const loggedUser = require('../middlewares/verifiedToken');

routes.post('/signup', isAdmin, loggedUser, userApi.signUpUser);
routes.post('/login', userApi.loginUser);
routes.post('/logout', loggedUser, userApi.logoutUser);

module.exports = routes;