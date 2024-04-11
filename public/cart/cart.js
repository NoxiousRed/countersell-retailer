//filling out the total cost modifiers
let totalCost = 0;

document.addEventListener('DOMContentLoaded', async function () {

    const cartContents = document.getElementById('cart-contents')
    //grab user id from previous page to complete cart details, userID being used as placeholder until more steps in place.
    const id = 1;

    try {
        const response = await fetch(`http://localhost:3000/cart/${id}`)
        const cartDetails = await response.json()

        let cart = document.querySelector('.cart-contents')

        cartDetails.forEach(item => {
            const cartItem = createCartItem(item, cart)
        })

        const costDiv = document.getElementById('total-amount')
        getTotalCost(costDiv)

    } catch (err) {
        console.log(err)
    }
})

function createCartItem(cart, container) {
    const cartItem = document.createElement('p')
    cartItem.className = 'item-details';
    cartItem.innerHTML =
        `<img src=${cart.imageUrl}>
    <h4>Item name: ${cart.productName}</h4>
    <h4>Price: ${cart.price}</h4>
    <h4>Quantity: <p id="current-quantity">${cart.quantity}</p></h4>
    <input id="quantity-${cart.productId}" type="number" value=${cart.quantity}> <button id="update-quantity-btn-${cart.productId}">Update Quantity</button>
    <button id="remove-item-btn-${cart.productId}">Remove Item</button>
    <h4>Total cost: ${cart.quantity * cart.price}</h4>`
    totalCost += cart.quantity * cart.price;
    container.appendChild(cartItem)

    //adding event listeners to update and remove item to update the database accordingly
    const updateButton = cartItem.querySelector(`#update-quantity-btn-${cart.productId}`)
    updateButton.addEventListener('click', () => handleUpdate(cart.cartId, cart.productId))

    const removeButton = cartItem.querySelector(`#remove-item-btn-${cart.productId}`)
    removeButton.addEventListener('click', () => handleRemove(cart.cartId, cart.productId))
}

function getTotalCost(container) {
    const cost = document.createElement('p')
    cost.innerHTML = `<h1>$${totalCost}</h1>`
    container.appendChild(cost);
}

async function handleUpdate(cartId, productId) {
    try {
        const newQuantity = document.getElementById(`quantity-${productId}`).value

        const response = await fetch(`http://localhost:3000/cart/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: newQuantity, cartId: cartId, productId: productId })
        })
            .then(window.location.reload())
    } catch (err) {
        console.log(err)
    }
}

async function handleRemove(cartId, productId) {
    try {
        const response = await fetch(`http://localhost:3000/cart/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cartId: cartId, productId: productId })
        })
            .then(window.location.reload())
    } catch (err) {
        console.log(err)
    }
}