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
    }

    database() {
        mongoose.connect(databaseConfig.uri, {
            useNewUrlParser: true
        })
    }

    middlewares() {
        this.express.use(express.json())
    }
}

module.exports = new App().express;
