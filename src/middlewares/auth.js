const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const authConfig = require('../config/auth');

module.exports = async (req, res, next) => {
    const authHeader = req.headers['x-access-token']
    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided!' })
    }

    const token = authHeader
    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret)

        req.userId = decoded.id

        return next()
    } catch (err) {
        return res.status(401).json({ error: 'Token invalid!' })
    }
}