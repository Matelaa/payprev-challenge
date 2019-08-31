const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const authConfig = require('../config/auth');

// Middleware criado para verificar se o token daquele determinado usuario é valido
module.exports = async (req, res, next) => {

    // Captura o header atraves do campo 'x-access-token' informado no Postman ou Insomnia
    const authHeader = req.headers['x-access-token']

    // Se nao tiver nada no header, ele retorna um erro informando que o campo nao esta sendo informado
    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided!' })
    }

    // Fazendo a atribuição ao token atraves da informação do header
    const token = authHeader
    try {

        // Vai decodificar o token, com o que está dendo do authConfig
        const decoded = await promisify(jwt.verify)(token, authConfig.secret)

        // Se conseguir ele vai atribuir ao usuario que esta fazendo aquela requisição um token
        req.user = decoded

        // Vai fazer a chamada da proxima rota, caso o usuario esteja com um token valido
        return next()
    } catch (err) {

        // Retorna um erro caso o token seja invalido
        return res.status(401).json({ error: 'Token invalid!' })
    }
}