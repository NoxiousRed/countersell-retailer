let products = null

document.addEventListener('DOMContentLoaded', async function () {

    console.log("Window Loaded!");
    let productSelect = id('productSelect')
    let productForm = id('productForm')

    //get all products and display in dropdown.
    try {
        const response = await fetch('http://localhost:3000/products');
        products = await response.json();

        products.forEach(product => {
            let option = document.createElement('option');
            option.value = product.productId;
            option.textContent = product.productName;
            productSelect.appendChild(option);
        })
    } catch (err) {
        console.log(err)
    }

    productSelect.addEventListener('change', async function () {
        let productId = productSelect.value;
        try {
            const response = await fetch(`http://localhost:3000/details/${productId}`)
            card = await response.json();

            //populate form boxes with the card's currently held details
            id('productId').value = card.productId;
            id('productName').value = card.productName;
            id('productDescription').value = card.productDescription;
            id('setIdentifier').value = card.setIdentifier;
            id('setYear').value = card.setYear;
            id('imageUrl').value = card.imageUrl;
            id('categoryId').value = card.categoryId;
            id('isFeatured').value = card.isFeatured;

        } catch (err) {
            console.log(err)
        }
    })

    productForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        try {
            let params = new FormData(this)

            let productId = params.get('productId')
            let jsonBody = JSON.stringify(Object.fromEntries(params));

            const response = await fetch(`http://localhost:3000/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json' 
                },
                body: jsonBody,
            })
            .then(checkStatus)
            .then(window.location.reload())
        } catch (err) {
            console.log(err)
        }
    })

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
})();