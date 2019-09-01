const UserGit = require('../models/UserGit');
const List = require('../models/List');

module.exports = {

    // Listar apenas as listas daquele determinado usuario
    async index(req, res) {
        const { _id } = req.user
        
        const listsExists = await List.find({ user: _id })
        return res.status(200).json(listsExists)   
    },

    // Criar uma lista
    async store(req, res) {
        const { name, usersGit } = req.body

        // Procura por uma lista com o nome informado, caso nao exista, ele retorna um erro dizendo que nao encontrou
        const listExist = await List.findOne({ name })
        if (listExist) {
            return res.status(406).json({ error: 'This list already exists in our database.' })
        }

        if (usersGit === undefined) {
            const list = await List.create({ name,
                                             user: req.user._id,
                                             usersGit
                                            })
            res.status(201).json(list)
        }

        // For feito para caso ele queira criar uma lista com mais de um usuario de primeira, checar se esses usuarios estao disponiveis pelo admin
        for (let i = 0; i < usersGit.length; i++) {
            const userGitExists = await UserGit.findById({ _id: usersGit[i].userGit })
            const tag = usersGit[i].tag

            // Caso o usuario informado na lista, nao exista, retorna erro informando que esse usuario nao foi disponibilizado pelo admin
            if (!userGitExists) {
                return res.status(404).json({ error: 'This user was not registered in the database by an admin.' })
            }

            // if feito para obrigar ele a colocar uma tag para um usuario
            if (!tag || tag !== 'Full-stack' && tag !== 'Back-end' && tag !== 'Front-end') {
                return res.status(400).json({ error: `Nonexistent tag, put 'Full-stack' or 'Back-end' or 'Front-end'` })
            }
        }

        // Caso tudo esteja correto, ele cria uma lista, com aqueles determinados usuarios e salva no banco
        const list = await List.create({ name,
                                         user: req.user._id,
                                         usersGit
                                         })
        res.status(201).json(list)
    },

    // Deletar uma lista, mas so pode deletar se o usuario que esta logado for o mesmo que criou a lista
    async destroy(req, res) {
        const { id } = req.params

        // Checa se existe uma lista com aquele id, se nao existir, retorna um erro informando que essa lista nao existe
        const listExists = await List.findById(id)
        if (!listExists) {
            return res.status(404).json({ error: 'This list doesnt exists in our database.' })
        }

        // Capturando o id do usuario que esta fazendo a requisicao
        const { _id } = req.user

        // Fazendo um cast para String, pois no mongo é salvo como ObjectId, e o req.user._id Object
        const idUserToString = JSON.stringify(_id)
        const idListToString = JSON.stringify(listExists.user)

        // Se o id de user da lista for igual ao usuario da requisicao ele permite deletar
        if (idListToString === idUserToString) {
            await List.findByIdAndDelete({ _id: listExists._id })
            return res.status(200).json({ success: 'This list is deleted succesfully.' })
        }

        // Caso os id's nao forem iguais, ele impede de deletar aquela lista, pois nao pertence a ele
        return res.status(401).json({ error: 'This list was not created by you, you can not delete it.' })
    },

    // Alterando uma lista, mas so pode alterar se o usuario que esta logado for o mesmo que criou a lista
    async update(req, res) {
        const { name } = req.body
        const { id } = req.params

        // Checa se existe uma lista com aquele id, se nao existir, retorna um erro informando que essa lista nao existe
        const listExists = await List.findById(id)
        if (!listExists) {
            return res.status(404).json({ error: 'This list doesnt exists in our database.' })
        }

        // Capturando o id do usuario que esta fazendo a requisicao
        const { _id } = req.user
        // Fazendo um cast para String, pois no mongo é salvo como ObjectId, e o req.user._id Object
        const idUserToString = JSON.stringify(_id)
        const idListToString = JSON.stringify(listExists.user)

        // Se o id de user da lista for igual ao usuario da requisicao ele permite alterar
        if (idListToString === idUserToString) {
            const list = await List.findByIdAndUpdate({ _id: listExists._id }, { name: name })
            list.save()

            // Criando essa nova newList, para buscar apos a alteracao e retornar um json com a informacao nova
            const newList = await List.findById(id)
            return res.status(200).json(newList)
        }

        // Caso os id's nao forem iguais, ele impede de deletar aquela lista, pois nao pertence a ele
        return res.status(401).json({ error: 'This list was not created by you, you can not update it.' })
    }
}