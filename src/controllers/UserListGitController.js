const List = require('../models/List');
const UserGit = require('../models/UserGit');

module.exports = {

    // Listar usuarios disponiveis por um administrador
    async index(req, res) {

        // Busca por todos os usuarios e retorna eles
        const usersGit = await UserGit.find({})
        res.status(200).json(usersGit)
    },

    // Atribuir um usuario a uma lista
    async store(req, res) {
        const { login, name, tag } = req.body

        // Checa se esse usuario está na base de dados fornecida pelo administrador, caso nao, nao permite registrar em uma lista retornando um erro
        const userGitExists = await UserGit.findOne({ login })
        if (!userGitExists) {
            return res.status(401).json({ error: 'This userGit is unnavaliable by admin.' })
        }

        // Checa se existe uma lista com o nome informado, caso nao exista, retorna um erro informando que essa lista nao existe
        const listExists = await List.findOne({ name })
        if (!listExists) {
            return res.status(404).json({ error: 'This List doesnt exists.' })
        }
        
        // if feito para obrigar ele a colocar uma tag para um usuario
        if (!tag || tag !== 'Full-stack' && tag !== 'Back-end' && tag !== 'Front-end') {
            return res.status(404).json({ error: `Nonexistent tag, put 'Full-stack' or 'Back-end' or 'Front-end'` })
        }

        // Capturando o id do usuario que esta fazendo a requisicao
        const { _id } = req.user

        // Fazendo um cast para String, pois no mongo é salvo como ObjectId, e o req.user._id Object
        const idUserToString = JSON.stringify(_id)
        const idListToString = JSON.stringify(listExists.user)

        //
        if (idListToString === idUserToString) {
            const list = await List.findById({ _id: listExists._id })
            // Fazendo um cast para String, pois esta vindo do mongo como Object
            const idUserGitExistsToString = JSON.stringify(userGitExists._id)

            // For feito para verificar se aquele determinado user ja nao existe dentro dessa determina lista
            for (let i = 0; i < list.usersGit.length; i++) {
                // Fazendo um cast para String, pois no mongo esta vindo como ObjectId
                const idUserGitListToString = JSON.stringify(list.usersGit[i].userGit)

                // if feito para checar se os ids sao iguais do usuario da lista e do que esta informado no body
                if (idUserGitExistsToString === idUserGitListToString) {
                    return res.status(401).json({ error: 'This userGit is already in this list.' })
                }
            }

            // Caso ainda nao exista, ele vai appendar esse usuario na lista ja criada
            list.usersGit.push({
                userGit: userGitExists._id,
                tag
            })

            // Salva esse usuario na base de dados e retorna a lista atualizada
            await list.save()
            return res.status(200).json(list)
        }

        // Caso o usuario que esta tentando adicionar nessa lista nao for dono dela, impede ele de realizar qualquer coisa nessa lista
        return res.status(401).json({ error: 'This list was not created by you, you can not insert something here.' })
    }
}