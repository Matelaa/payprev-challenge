const axios = require('axios');
const User = require('../models/User');
const UserGit = require('../models/UserGit');

module.exports = {
    async index(req, res) {
        const { isAdmin } = await User.findById({ _id: req.user._id })
        if (!isAdmin) {
            return res.status(401).json({ error: 'You dont have permission to do this.' })
        }

        const { username } = req.params
        
        const user = await axios.get(`https://api.github.com/users/${username}`)
        if (!user) {
            return res.status(404).json({ error: 'This user does not exist in our database.' })
        }

        const { login, name, bio, location, html_url } = user.data
        return res.status(200).json({ success: login,
                                               name,
                                               bio,
                                               location,
                                               html_url })
    }
}