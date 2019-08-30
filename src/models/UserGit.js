const mongoose = require('mongoose');

const UserGitSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    bio: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    html_url: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('UserGit', UserGitSchema);