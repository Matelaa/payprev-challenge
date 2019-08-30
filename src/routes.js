const express = require('express');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/users', UserController.index)
routes.post('/user', UserController.store)
routes.post('/login', UserController.login)

module.exports = routes;