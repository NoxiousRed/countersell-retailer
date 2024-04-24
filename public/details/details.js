document.addEventListener('DOMContentLoaded', async function () {

    //grab user and cart ids from page to complete cart details, 1 being used as placeholder until more steps in place.
    const userId = 1;
    const cartId = 1;

    //grab id value passed from previous page
    const id = new URLSearchParams(window.location.search).get('id');
    try {
        const response = await fetch(`http://localhost:3000/details/${id}`)
        const cardDetails = await response.json()

        const cardFetch = await fetch(`https://api.scryfall.com/cards/${cardDetails.setIdentifier.toLowerCase()}/${cardDetails.cardNumber}`)
        const cardFetchJson = await cardFetch.json()

        let imageDetails = document.querySelector('.img-container')
        let productDetails = document.querySelector('.card-details')

        const imageDisplayDetails = document.createElement('p')
        imageDisplayDetails.className = 'img-container';
        imageDisplayDetails.innerHTML = `
        <img src=${cardDetails.imageUrl} alt="card-placeholder"/>`
        imageDetails.appendChild(imageDisplayDetails)

        const displayDetails = document.createElement('p');
        displayDetails.className = 'card-details';
        displayDetails.innerHTML = `
        <h1>${cardDetails.productName}</h1>
        <h3>Card Price: ${cardFetchJson.prices.usd}</h3>
        <h3>Description: ${cardDetails.productDescription}</h3>
        <h3>Set Identifier: ${cardDetails.setIdentifier}</h3>
        <h3>Set Year: ${cardDetails.setYear}</h3>`

        productDetails.appendChild(displayDetails)

        const addToCart = document.querySelector('#cart-button-holder')
        addToCart.addEventListener('click', () => handleAddToCart(id, userId, cartId))
    } catch (err) {
        console.log(err)
    }
})

async function handleAddToCart(productId, userId, cartId) {
    try {
        const addToCartButton = document.querySelector('#cart-button-holder')
        const response = await fetch(`http://localhost:3000/cart/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId: productId, cartId: cartId, quantity: 1 })
        })
        addToCartButton.innerHTML = "Added to Cart!"
        addToCartButton.disabled = true;
    } catch (err) {
        console.log(err)
    }
}

//helper functions
function id(idName) {
    return document.getElementById(idName);
}
function checkStatus(response) {
    if (!response.ok) {
        throw Error('Error in request: ' + response.statusText);
    }
    return response.json();
}