const database = require('../database/database')
const express = require('express');
const app = express();

const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

const multer = require('multer');
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const INVALID_PARAM_ERROR = 400;
const SERVER_ERROR = 500;
const SERVER_ERROR_MSG = 'Something went wrong on the server.';

async function getDbConnection() {
    const db = await sqlite.open({
        filename: 'ecommerce.db',
        driver: sqlite3.Database
    });
    console.log('Database connected!');
    return db;
}

async function initializeDatabase() {
    const db = await getDbConnection();
    database.tablesExist((err, exists) => {
        if (err) {
            console.error('Trouble checking for existing tables: ', err.message)
        }
        //if tables don't exist, go ahead and make them
        if (!exists) {
            console.log('No tables found, creating...')
            database.createTables();
            console.log('Tables created');
        } else {
            console.log('Tables exist, skipping creation...')
        }
        database.closeConnection();
    })
}

initializeDatabase();

const PORT = process.env.PORT || 8000;
app.listen(PORT);

module.exports = {
    getDbConnection
}