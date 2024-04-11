const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const bettersqlite3 = require('better-sqlite3');
const fs = require('fs');


const db3 = new bettersqlite3("./database/ecommerce.db");

const db2 = new sqlite.Database('ecommerce.db', (err) => {
    if (err) {
        console.error('Error connecting to the database: ', err.message);
    } else {
        console.log('Connected to database in database.js');
    }
});


async function getDBConnection() {
    const db = await sqlite.open({
        filename: 'ecommerce.db',
        driver: sqlite3.Database
    });
    console.log("db:" + db.filename);
    return db;
}

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


function getAll() {
    let qry = "SELECT * FROM products;";
    let results = db3.prepare(qry).all([]);
    return results;
}

function getProductDetails(id) {
    let qry = "SELECT * FROM products where productId=?;";
    let item = db3.prepare(qry).get([id]);
    return item;
}

function updateDetails(id, data) {
    try {
        let qry = "UPDATE products SET productId=?, productName=?, productDescription=?, imageUrl=?, price=?, categoryId=?, isFeatured=?, setIdentifier=?, setYear=? WHERE productId=?"
        let updatedItem = db3.prepare(qry).run([
            data.productId,
            data.productName,
            data.productDescription,
            data.imageUrl,
            data.price,
            data.categoryId,
            data.isFeatured,
            data.setIdentifier,
            data.setYear,
            id
        ])
    } catch (err) {
        console.log(err)
    }
}

function addToCart(data) {
    try {
        let qry = "INSERT INTO cartproducts (productId, cartId, quantity) VALUES (?, ?, ?);"
        let cart = db3.prepare(qry).run([
            data.productId,
            data.cartId,
            data.quantity
        ])
        return cart
    } catch (err) {
        console.log(err)
    }
}

function getCart(id) {
    try {
        let qry = "SELECT c.cartId, cp.productId, cp.quantity, p.productId, p.imageUrl, p.productName, p.price FROM cart c JOIN cartproducts cp ON c.cartId = cp.cartId JOIN products p ON cp.productId = p.productId WHERE userId=?;"
        let cart = db3.prepare(qry).all([id]);
        return cart
    } catch (err) {
        console.log(err)
    }
}

function updateCart(data) {
    try {
        let qry = "UPDATE cartproducts SET quantity=? WHERE cartId=? AND productId=?";
        let updatedCart = db3.prepare(qry).run([
            data.quantity,
            data.cartId,
            data.productId
        ])
    } catch (err) {
        console.log(err)
    }
}

function removeItem(data) {
    try {
        let qry = "DELETE FROM cartproducts WHERE cartId=? AND productId=?";
        let updatedCart = db3.prepare(qry).run([
            data.cartId,
            data.productId
        ])
    } catch (err) {
        console.log(err)
    }
}

//function to create tables
function createTables() {
    //reads contents of create_tables and stores it
    const createTablesSql = fs.readFileSync('./database/create_tables.sql', 'utf8');

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
    getAll,
    getProductDetails,
    closeConnection,
    updateDetails,
    getCart,
    updateCart,
    removeItem,
    addToCart
    // db
};