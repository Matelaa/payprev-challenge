const express = require('express');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const UserAdminController = require('./controllers/UserAdminController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.post('/login', SessionController.store)
routes.post('/user', UserController.store)
routes.get('/users', UserController.index)

//TODO: TODAS AS ROTAS APOS O authMiddleware, terao que fazer a verificacao de token
routes.use(authMiddleware)

routes.get('/userGit/:username', UserAdminController.index)
routes.post('/userGit/:username', UserAdminController.store)

module.exports = routes;