document.addEventListener('DOMContentLoaded', function() {

    //set up what is going to be displayed where in the document
    const cardDisplayContainer = document.getElementById('details-container')

    //grab the id value passed from the previous page:
    let id = new URLSearchParams(window.location.search).get('id');
    //parse out the details for the card associated with that id
    let cardDetails = getCardDetails(id);

    async function getCardDetails(cardId) {
        const response = await fetch("../products/products.json")
        products = await response.json();
        console.log(products);
    }

});