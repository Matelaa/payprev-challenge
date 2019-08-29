require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const databaseConfig = require('./config/database');

class App {
    constructor() {
        this.express = express();
        this.isDev = process.env.NODE_ENV !== 'production';

        this.database();
        this.middlewares();
        this.routes
    }

    database() {
        mongoose.connect(databaseConfig.uri, {
            useNewUrlParser: true
        })
    }

    routes() {
        this.express.use(require('./routes'))
    }

    middlewares() {
        this.express.use(express.json())
    }
}

module.exports = new App().express;
