const routes = require('express').Router();
const userApi = require('../controllers/userApi');

routes.post('/signup', userApi.signUpUser);

module.exports = routes;