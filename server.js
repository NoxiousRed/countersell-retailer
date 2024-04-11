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

app.delete('/cart/:id', (req, res) => {
    try {
        const data = req.body
        const cart = database.removeItem(data)
        res.json(cart)
    } catch (err) {
        console.log(err)
    }
})

app.post('/products/new', (req, res) => {
    try {
        console.log("Recieved Post!")
        const newProducts = req.body
        products.push(newProducts)
        res.json(products)
    } catch (err) {
        console.log(err)
    }
})

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


const products = [
    {
        "productId": 1,
        "productName": "ExCard1",
        "price": "$1.00",
        "imageUrl": "https://p1.hiclipart.com/preview/437/300/906/mtg-blank-blue-card-png-clipart.jpg",
        "productDescription": "sample-card-description",
        "setIdentifier": "SAMP-SET",
        "setYear": "Sample-20XX",
        "categoryId": 1,
        "isFeatured": 1
    },
    {
        "productId": 2,
        "productName": "ExCard2",
        "price": "$2.00",
        "imageUrl": "https://p1.hiclipart.com/preview/437/300/906/mtg-blank-blue-card-png-clipart.jpg",
        "productDescription": "sample-card-description",
        "setIdentifier": "SAMP-SET",
        "setYear": "Sample-20XX",
        "categoryId": 1,
        "isFeatured": 1
    },
    {
        "productId": 3,
        "productName": "ExCard3",
        "price": "$3.00",
        "imageUrl": "https://p1.hiclipart.com/preview/437/300/906/mtg-blank-blue-card-png-clipart.jpg",
        "productDescription": "sample-card-description",
        "setIdentifier": "SAMP-SET",
        "setYear": "Sample-20XX",
        "categoryId": 1,
        "isFeatured": 1
    },
    {
        "productId": 4,
        "productName": "ExCard4",
        "price": "$4.00",
        "imageUrl": "https://p1.hiclipart.com/preview/437/300/906/mtg-blank-blue-card-png-clipart.jpg",
        "productDescription": "sample-card-description",
        "setIdentifier": "SAMP-SET",
        "setYear": "Sample-20XX",
        "categoryId": 1,
        "isFeatured": 1
    },
    {
        "productId": 5,
        "productName": "ExCard5",
        "price": "$5.00",
        "imageUrl": "https://p1.hiclipart.com/preview/437/300/906/mtg-blank-blue-card-png-clipart.jpg",
        "productDescription": "sample-card-description",
        "setIdentifier": "SAMP-SET",
        "setYear": "Sample-20XX",
        "categoryId": 1,
        "isFeatured": 1
    },
    {
        "productId": 6,
        "productName": "ExCard6",
        "price": "$6.00",
        "imageUrl": "https://p1.hiclipart.com/preview/437/300/906/mtg-blank-blue-card-png-clipart.jpg",
        "productDescription": "sample-card-description",
        "setIdentifier": "SAMP-SET",
        "setYear": "Sample-20XX",
        "categoryId": 1,
        "isFeatured": 1
    },
    {
        "productId": 7,
        "productName": "ExCard7",
        "price": "$7.00",
        "imageUrl": "https://p1.hiclipart.com/preview/437/300/906/mtg-blank-blue-card-png-clipart.jpg",
        "productDescription": "sample-card-description",
        "setIdentifier": "SAMP-SET",
        "setYear": "Sample-20XX",
        "categoryId": 1,
        "isFeatured": 1
    },
    {
        "productId": 8,
        "productName": "ExCard8",
        "price": "$8.00",
        "imageUrl": "https://p1.hiclipart.com/preview/437/300/906/mtg-blank-blue-card-png-clipart.jpg",
        "productDescription": "sample-card-description",
        "setIdentifier": "SAMP-SET",
        "setYear": "Sample-20XX",
        "categoryId": 1,
        "isFeatured": 1
    }
]