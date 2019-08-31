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

        const listExist = await List.findOne({ name })
        if (listExist) {
            return res.status(400).json({ error: 'This list already exists in our database.' })
        }

        // For feito para caso ele queira criar uma lista com mais de um usuario de primeira, checar se esses usuarios estao disponiveis pelo admin
        for (let i = 0; i < usersGit.length; i++) {
            const userGitExists = await UserGit.findById({ _id: usersGit[i].userGit })
            if (!userGitExists) {
                return res.status(401).json({ error: 'This user was not registered in the database by an admin.' })
            }
        }

        const list = await List.create({ name,
                                         user: req.user._id,
                                         usersGit
                                         })
        res.status(201).json(list)
    },

    // Deletar uma lista, mas so pode deletar se o usuario que esta logado for o mesmo que criou a lista
    async destroy(req, res) {
        const { id } = req.params

        const listExists = await List.findById(id)
        if (!listExists) {
            return res.status(404).json({ error: 'This list doesnt exists in our database.' })
        }

        const { _id } = req.user
        // Fazendo um cast para String, pois no mongo é salvo como ObjectId, e o req.user._id Object
        const idUserToString = JSON.stringify(_id)
        const idListToString = JSON.stringify(listExists.user)
        if (idListToString === idUserToString) {
            await List.findByIdAndDelete({ _id: listExists._id })
            return res.status(200).json({ success: 'This list is deleted succesfully.' })
        }

        return res.status(401).json({ error: 'This list was not created by you, you can not delete it.' })
    },

    // Alterando uma lista, mas so pode alterar se o usuario que esta logado for o mesmo que criou a lista
    async update(req, res) {
        const { name } = req.body
        const { id } = req.params

        const listExists = await List.findById(id)
        if (!listExists) {
            return res.status(404).json({ error: 'This list doesnt exists in our database.' })
        }

        const { _id } = req.user
        // Fazendo um cast para String, pois no mongo é salvo como ObjectId, e o req.user._id Object
        const idUserToString = JSON.stringify(_id)
        const idListToString = JSON.stringify(listExists.user)
        if (idListToString === idUserToString) {
            const list = await List.findByIdAndUpdate({ _id: listExists._id }, { name: name })
            list.save()

            // Criando essa nova newList, para buscar apos a alteracao e retornar um json com a informacao nova
            const newList = await List.findById(id)
            return res.status(200).json(newList)
        }

        return res.status(401).json({ error: 'This list was not created by you, you can not update it.' })
    }
}