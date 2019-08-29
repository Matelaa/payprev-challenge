const User = require('../model/User');
const bcrypt = require('bcrypt');

module.exports = {
    async index(req, res) {
        const users = await User.find({})

        return res.status(200).json(users)
    },

    async store(req, res) {
        const { email, cpf, password, isAdmin } = req.body;

        const existsEmail = await User.findOne({ email })
        if (existsEmail) {
            return res.status(400).json({ error: 'This email already exists in our database.' })
        }

        const existsCpf = await User.findOne({ cpf })
        if (existsCpf) {
            return res.status(400).json({ error: 'This CPF already exists in our database.' }) 
        }

        const cryptPassword = await bcrypt.hash(password, 10);
        if (isAdmin !== undefined) {
            const user = await User.create({ email,
                                             cpf,
                                             password: cryptPassword,
                                             isAdmin })

            return res.status(201).json(user)
        }

        const user = await User.create({ email,
                                         cpf,
                                         password: cryptPassword })

        return res.status(201).json(user)
    },

    async login(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: 'This user does not exist in our database.'  })
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(400).json({ error: 'Wrong password.' })
        }

        return res.status(200).json({ success : user })
    }
}