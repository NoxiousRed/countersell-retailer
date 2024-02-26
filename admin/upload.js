'use strict';
(function () {

    window.addEventListener('load', init);

    function init() {
        //set up form on upload.html to accept submission
        id('upload-form').addEventListener('submit', function (e) {
            e.preventDefault();
            submitForm();
        });
    }

    //placeholder URL for seeing resulting JSON after upload
    const POST_URL = 'https://crudcrud.com/api/a6d60e4b3b214d6390c3018506182424';
    function submitForm() {
        let params = new FormData(id('upload-form')); //pass in form
        let jsonBody = JSON.stringify(Object.fromEntries(params)); //make form json string
        //placeholder justcors for seeing resulting JSON after upload
        let corsUrl = 'https://justcors.com/tl_08e3233/' + POST_URL;
        fetch(corsUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: jsonBody
        })
            .then(checkStatus)
            .then(console.log)
            .catch(alert);
    }

    function displayData() {
        let url = 

        //chaining thens allows you to access whatever data is returned in a then to following thens.
        fetch(url)
            .then(checkStatus)
            .then((submittedData) => {
                console.log(submittedData);
                let div = id('container');

                for (const item of submittedData) {
                    let cardName = document.createElement('p');
                    const cardPrice = item['name'];
                    repoName.innerHTML = 'Price: ' + cardPrice;
                    div.appendChild(repoName);

                    let repoDate = document.createElement('p');
                    const date = item['created_at'];
                    repoDate.innerHTML = 'Created: ' + date;
                    div.appendChild(repoDate);

                    let upateDate = document.createElement('p');
                    const updated = item['updated_at'];
                    upateDate.innerHTML = 'Updated: ' + updated;
                    div.appendChild(upateDate);

                    let rule = document.createElement('hr');
                    div.appendChild(rule);
                }
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
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
})