const Yup = require('yup');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const authConfig = require('../config/auth');

module.exports = {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6)
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Invalid email or password!' })
        }

        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: 'This user does not exist in our database.' })
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            return res.status(400).json({ error: 'Wrong password.' })
        }

        const { _id } = user

        return res.status(200).json({
            user: {
                _id,
                email
            },
            token: jwt.sign({ _id }, authConfig.secret)
        })
    }
}