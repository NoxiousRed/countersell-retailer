let products = null

document.addEventListener('DOMContentLoaded', async function () {

    const inventory = document.getElementById('list-products');

    try {
        const response = await fetch('http://localhost:3000/products');
        products = await response.json();

        console.log(products);
        let listProduct = document.querySelector('.list-products')

        products.forEach(card => {
            const listItem = createListItem(card, listProduct)
        })
    } catch (err) {
        console.log(err)
    }
})

function createListItem(card, container) {
    //link card to corresponding container
    const listItem = document.createElement('p');
    listItem.className = 'list-item';
    listItem.innerHTML = `<img src = ${card.imageUrl} alt = "card-placeholder"><br>${card.productName}<br>${card.price}<br><a href="../details/details.html?id=${card.productId}">View Card</a>`;
    container.appendChild(listItem);

    return listItem;
}