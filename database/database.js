const sqlite3 = require('sqlite3');
const fs = require('fs');

const db = new sqlite3.Database('ecommerce.db', (err) => {
    if (err) {
        console.error('Error connecting to the database: ', err.message);
    } else {
        console.log('Connected to database.');
    }
});

//check if tables exist before calling createTables
function tablesExist(callback) {
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name IN (('Users', 'Categories', 'Products', 'Carts', 'CartProducts')", (err, row) => {
        if (err) {
            console.error('Error checking for existing tables: ', err.message);
            callback(err, null);
        } else {
            //if the tables already exist, we won't call createTables twice
            callback(null, row ? true : false);
        }
    })
}


//function to create tables
function createTables() {
    //reads contents of create_tables and stores it
    const createTablesSql = fs.readFileSync('create_tables.sql', 'utf8');

    db.serialize(() => {
        //execute create_tables
        db.exec(createTablesSql, (err) => {
            if (err) {
                console.error('Error creating tables: ', err.message);
            } else {
                console.log('Tables created successfully');
            }
        })
    })
}

//closes connection to the database after used
function closeConnection() {
    db.close((err) => {
        if (err) {
            console.error('Problem closing database connection: ', err.message);
        } else {
            console.log('Database connection closed successfully');
        }
    });
}

//export these modules so they can be used elsewhere
module.exports = {
    tablesExist,
    createTables,
    closeConnection
};