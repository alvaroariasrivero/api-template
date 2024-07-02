const routes = require('express').Router();
const userApi = require('../controllers/userApi');
const isAdmin = require('../middlewares/isAdmin');

routes.post('/signup', isAdmin, userApi.signUpUser);
routes.post('/login', userApi.loginUser);

module.exports = routes;