const mongoose = require('mongoose');

// O motivo de nao colocar name, bio e location como required = true, é porque esses campos podem vir como nulos
const UserGitSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },

    name: {
        type: String
    },

    bio: {
        type: String
    },

    location: {
        type: String
    },

    html_url: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('UserGit', UserGitSchema);