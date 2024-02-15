document.addEventListener('DOMContentLoaded', function() {

    //set up what is going to be displayed where in the document
    const cardDisplayContainer = document.getElementById('content-container');
    console.log(cardDisplayContainer);

    //grab the id value passed from the previous page:
    let id = new URLSearchParams(window.location.search).get('id');
    //parse out the details for the card associated with that id
    getCardDetails(id)
        .then(cardDetails => {createCardDetails(cardDetails, cardDisplayContainer)});


    async function getCardDetails(cardId) {
        const response = await fetch("../products/products.json")
        products = await response.json();

        //getting associated card details
        for(let i = 0; i < products.length; i++) {
            if (products[i].id == cardId) {
                return(products[i]);
            }
        }
        //if no matching product is found, return default
        return(products[0]);
    }

    function createCardDetails(cardDetails, displayContainer){
         console.log(cardDetails);
        console.log(displayContainer);
        //create items for image and card details that populate based on id
        const itemImage = document.createElement('img-container');
        itemImage.id = "img-container"
        itemImage.innerHTML = `<img src=${cardDetails.image}></img>`;
        displayContainer.appendChild(itemImage);
    
        const itemDetails = document.createElement('card-details');
        itemDetails.id = "card-details"
        itemDetails.innerHTML = `<h1>${cardDetails.name}</h1>
        <h3>Card Price: ${cardDetails.price}</h3>
        <h3>${cardDetails.description}</h3>
        <h3>Set Identifier: ${cardDetails.setIdentifier}</h3>
        <h3>Set Year: ${cardDetails.setYear}</h3>`;
        displayContainer.appendChild(itemDetails);

        return itemDetails;
    }

});