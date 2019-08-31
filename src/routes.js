const express = require('express');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');
const UserAdminController = require('./controllers/UserAdminController');
const ListController = require('./controllers/ListController');
const UserListGitController = require('./controllers/UserListGitController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

// SessionController - Rota para realizar o login
routes.post('/login', SessionController.store)

// UserController - Rotas para criar um User e listar os users.
routes.post('/user', UserController.store)
routes.get('/users', UserController.index)

// AuthMiddleware - Faz a requisição de permissao de token para realizar determinadas requisições, todas as rotas abaixo dessa, passarão pela requisição de token
routes.use(authMiddleware)

// UserAdminController - Rotas para listar um userGit e criar um para disponibilizar para os membros comuns (Só podem ser usadas caso o usuario logado for Admin)
routes.get('/userGit/:username', UserAdminController.index)
routes.post('/userGit', UserAdminController.store)

// ListController - Rotas responsaveis pelo CRUD de listas
routes.post('/list', ListController.store)
routes.delete('/list/:id', ListController.destroy)
routes.put('/list/:id', ListController.update)
routes.get('/lists', ListController.index)

// UserListGitController - Rotas responsaveis por listar os usersGit disponiveis por um admin e inserir eles em uma lista
routes.post('/userGit/list', UserListGitController.store)
routes.get('/usersGit', UserListGitController.index)

module.exports = routes;