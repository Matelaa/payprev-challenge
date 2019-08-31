const axios = require('axios');
const User = require('../models/User');
const UserGit = require('../models/UserGit');

module.exports = {

    // Listar usuarios do github
    async index(req, res) {

        // Checa se o usuario é um admin, pois essas requisicoes do podem ser efetuadas por admin, se nao for, retorna um erro falando que nao tem permissao
        const { isAdmin } = await User.findById({ _id: req.user._id })
        if (!isAdmin) {
            return res.status(401).json({ error: 'You dont have permission to do this.' })
        }

        // Pega o username informado nos parametros
        const { username } = req.params
        
        // Checa se existe esse usuario na api do github, se nao existir, retorna um erro
        const user = await axios.get(`https://api.github.com/users/${username}`)
        if (!user) {
            return res.status(404).json({ error: 'This user does not exist.' })
        }

        // Pega todas as informacoes necessarias do usuario para retornar ao usuario o que foi pedido
        const { login, name, bio, location, html_url } = user.data
        return res.status(200).json({ success: login,
                                               name,
                                               bio,
                                               location,
                                               html_url })
    },

    // Criar um usuario que ficarao disponiveis para usuarios comuns usarem
    async store(req, res) {

        // Checa se o usuario é um admin, pois essas requisicoes do podem ser efetuadas por admin, se nao for, retorna um erro falando que nao tem permissao
        const { isAdmin } = await User.findById({ _id: req.user._id })
        if (!isAdmin) {
            return res.status(401).json({ error: 'You dont have permission to do this.' })
        }

        // Pega o username informado nos parametros
        const { username } = req.body
        
        // Checa se existe esse usuario na api do github, se nao existir, retorna um erro
        const userGit = await axios.get(`https://api.github.com/users/${username}`)
        if (!userGit) {
            return res.status(404).json({ error: 'This user does not exist in our database.' })
        }

        // Checa se ja existe um usuario com esse nome na base de dados, se existir retorna um erro impedindo de criar novamente
        const userExists = await UserGit.findOne({ login: username })
        if (userExists) {
            return res.status(406).json({ error: 'This user already exists in our database.' })
        }

        // Pega todas as informacoes necessarias do usuario para salvar na base de dados
        const { login, name, bio, location, html_url } = userGit.data
        const user = await UserGit.create({ login,
                                            name,
                                            bio,
                                            location,
                                            html_url })

        return res.status(201).json(user)
    }
}