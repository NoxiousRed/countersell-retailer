let products = null;

document.addEventListener('DOMContentLoaded', async function () {
  const inventory = document.getElementById('list-products');

  const response = await fetch('products.json');
  products = await response.json();
  console.log(products);

  let listProduct = document.querySelector('.list-products')

  products.forEach(card => {
    const listItem = createListItem(card, listProduct)
  });
});

function createListItem(card, container) {
  //link the card to its corresponding container
  const listItem = document.createElement('p');
  listItem.className = 'list-item';
  listItem.innerHTML = `<img src = ${card.image} alt = "card-placeholder"><br>${card.name}<br>${card.price}<br><a href="/details.html?id=${card.id}">View Card</a>`;
  container.appendChild(listItem);
  

  return listItem;
}

