document.addEventListener('DOMContentLoaded', function () {
    init();

    function init() {
        console.log("Window Loaded!");
        //set up form on upload.html to accept submission
        let uploadForm = id('upload-form')
        uploadForm.addEventListener('submit', function (e) {
            e.preventDefault();
            submitForm();
        });
    }

    function submitForm() {
        console.log("Form submitted!")
        let formData = new FormData(id('upload-form')); //pass in form

        //convert form data to json object
        let object = {}
        for (let [key, value] of formData.entries()) {
            object[key] = value;
        }
        const formDataJson = JSON.stringify(object)
        console.log(formDataJson)
        fetch("http://localhost:3000/products/new", {
            method: 'POST',
            body: formDataJson
        })
            .then(checkStatus)
            .then(console.log)
            .catch(alert);
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
})();