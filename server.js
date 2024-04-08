const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.static('public'))

//get all products
app.get('/products', (req, res) => {
    const products = getAllProducts();
    res.json(products);
})

//get single card details
app.get('/details/:id', (req, res) => {
    try {
        const id = req.params.id;
        const details = getProductDetails(id)
        res.json(details)
    } catch (err) {
        console.log(err)
    }
})

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})

function getProductDetails(cardId) {
    for(let i = 0; i < products.length; i++){
        if (products[i].productId == cardId) {
            return products[i];
        }
    }
}

function getAllProducts() {
    return products
}

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