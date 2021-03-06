const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    usersGit: [{
        _id: false,
        userGit: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserGit'
        },
        
        tag: {
            type: String
        }
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('List', ListSchema);