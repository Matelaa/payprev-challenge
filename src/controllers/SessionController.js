const Yup = require('yup');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const authConfig = require('../config/auth');

module.exports = {

    // Realizar um login
    async store(req, res) {
        // Schema criado para chegar setar o tipo de validação para os campos que irao fazer a requisição através do body
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6)
        });

        // Caso alguma validação dê falha, ele nao permite fazer o login retornando ese error
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Invalid email or password!' })
        }

        const { email, password } = req.body

        // Procura por um usuario com aquele determinado email na base de dados, se nao encontrar, nao permite fazer o login
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: 'This user does not exist in our database.' })
        }

        // Checa se o password informado é igual ao que esta criptografado na base de dados (realiza um check criptografando o informado), se nao bater, nao permite o login
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(400).json({ error: 'Wrong password.' })
        }

        // Captura o id do usuario que ta fazendo a requisicao
        const { _id } = user

        // Caso tudo estiver correto, ele vai realizar o login e gerar um token para aquele determinado usuario checando se pode fazer requisicoes futuras
        return res.status(200).json({
            user: {
                _id,
                email
            },
            token: jwt.sign({ _id: user._id }, authConfig.secret)
        })
    }
}