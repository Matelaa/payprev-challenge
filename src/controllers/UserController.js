const Yup = require('yup');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Regex criado para fazer a validação de CPF
const regexCpf = `^[0-9]{11}$`;
const regexp = new RegExp(regexCpf);

module.exports = {

    // Listar os usuarios
    async index(req, res) {

        // Busca por todos os usuarios e retorna eles
        const users = await User.find({})

        return res.status(200).json(users)
    },

    // Criar um usuario
    async store(req, res) {
        // Schema criado para chegar setar o tipo de validação para os campos que irao fazer a requisição através do body
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6)
        });

        // Caso alguma validação dê falha, ele nao permite fazer criar uma conta retornando ese error
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: `Invalid email or password!` })
        }

        const { email, cpf, password, isAdmin } = req.body;

        // Checa se o cpf informado é válido através do regex, se nao for, retorna um erro informando que é invalido
        const checkCpfIsValid = regexp.test(cpf)
        if (!checkCpfIsValid) {
            return res.status(400).json({ error: 'Invalid cpf.' })
        }

        // Procura por um usuario com aquele determinado email na base de dados, caso exista, nao permite criar outra conta com o mesmo email
        const existsEmail = await User.findOne({ email })
        if (existsEmail) {
            return res.status(406).json({ error: 'This email already exists in our database.' })
        }

        // Procura por um usuario com aquele determinado cpf na base de dados, caso exista, nao permite criar outra conta com o mesmo cpf
        const existsCpf = await User.findOne({ cpf })
        if (existsCpf) {
            return res.status(406).json({ error: 'This CPF already exists in our database.' }) 
        }

        // Criptografa o password informado pelo usuario
        const cryptPassword = await bcrypt.hash(password, 10);

        // Caso o campo de admin for informado, ele vai atribuir que esse usuario é um usuario adminstrador e cria ele na base de dados
        if (isAdmin !== undefined) {
            const user = await User.create({ email,
                                             cpf,
                                             password: cryptPassword,
                                             isAdmin })

            return res.status(201).json(user)
        }

        // Caso o campo de admin nao for informado, ele atribuir que esse usuario é apenas um usuario comum
        const user = await User.create({ email,
                                         cpf,
                                         password: cryptPassword })

        return res.status(201).json(user)
    }
}