document.addEventListener('DOMContentLoaded', async function() {

    //grab id value passed from previous page
    const id = new URLSearchParams(window.location.search).get('id');
    try {
        const response = await fetch (`http://localhost:3000/details/${id}`)
        const cardDetails = await response.json()
        console.log(cardDetails)


        let imageDetails = document.querySelector('.img-container')
        let productDetails = document.querySelector('.card-details')

        const imageDisplayDetails = document.createElement('p')
        imageDisplayDetails.className = 'img-container';
        imageDisplayDetails.innerHTML = `
        <img src=${cardDetails.imageUrl} alt="card-placeholder"/>`
        productDetails.appendChild(imageDisplayDetails)

        const displayDetails = document.createElement('p');
        displayDetails.className = 'card-details';
        displayDetails.innerHTML = `
        <h1>${cardDetails.productName}</h1>
        <h3>Card Price: ${cardDetails.price}</h3>
        <h3>Description: ${cardDetails.productDescription}</h3>
        <h3>Set Identifier: ${cardDetails.setIdentifier}</h3>
        <h3>Set Year: ${cardDetails.setYear}</h3>`

        productDetails.appendChild(displayDetails)
    } catch (err) {
        console.log(err)
    }
})