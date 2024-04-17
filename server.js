const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser');
const database = require('./database/database');
const app = express()
const port = 3000

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json());

//get all products
app.get('/products', (req, res) => {
    let products = database.getAll();
    res.json(products);
})

//get single card details
app.get('/details/:id', (req, res) => {
    try {
        const id = req.params.id;
        const details = database.getProductDetails(id)
        res.json(details)
    } catch (err) {
        console.log(err)
    }
})

//get cart details for user
app.get('/cart/:id', (req, res) => {
    try{
        const userId = req.params.id;
        const cart = database.getCart(userId)
        res.json(cart)
    } catch (err) {
        console.log(err)
    }
})

//adding an item to a cart
app.post('/cart/:id', (req, res) => {
    try {
        const data = req.body
        const cart = database.addToCart(data)
        res.json(cart)
    } catch (err) {
        console.log(err)
    }
})

//endpoint for updating cart entries
app.put('/cart/:id', (req, res) => {
    try {
        const data = req.body
        const cart = database.updateCart(data)
        res.json(cart)
    } catch (err) {
        console.log(err)
    }
})

//deleting an item from the cart
app.delete('/cart/:id', (req, res) => {
    try {
        const data = req.body
        const cart = database.removeItem(data)
        res.json(cart)
    } catch (err) {
        console.log(err)
    }
})

//adding new products to the database
app.post('/products/new', (req, res) => {
    try {
        const newProducts = req.body
        const products = database.postProducts(newProducts)
        res.json(products)
    } catch (err) {
        console.log(err)
    }
})

//updating item details
app.put('/:id', (req, res) => {
    try {
        console.log("Recieved Put!")

        const data = req.body
        const id = req.params.id;

        const update = database.updateDetails(id, data)
        res.json(update)
    } catch (err) {
        console.log(err)
    }
})

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})