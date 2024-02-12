let products = null;

document.addEventListener('DOMContentLoaded', function () {

  const inventory = document.getElementById('product-list-container');

  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      products = data;
      console.log(products)
    })
    .catch(error => console.error('Error fetching JSON:', error));
})

