document.addEventListener('DOMContentLoaded', function () {

    console.log("Window Loaded!");
    //set up form on upload.html to accept submission
    let form = document.querySelector('#upload-form')
    let file = document.querySelector('#file-input')

    form.addEventListener('submit', async function (event) {
        event.preventDefault()
        let file = document.querySelector('#file-input')

        if (!file.value.length) return;

        console.log("Form submitted!")

        var reader = new FileReader();
        reader.readAsText(file.files[0])
        reader.onload = function (event) {
            let str = event.target.result;
            var fileContent = JSON.parse(reader.result)

            //make a new post to endpoint for product info
            fetch("http://localhost:3000/products/new", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fileContent)
            })
                .then(checkStatus)
                .then(window.location.href = '/products/products.html')
                .catch(alert);
            
        }


    });

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
});