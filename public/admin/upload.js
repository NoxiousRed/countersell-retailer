document.addEventListener('DOMContentLoaded', function () {
    init();

    function init() {
        console.log("Window Loaded!");
        //set up form on upload.html to accept submission
        let form = document.querySelector('#upload-form')
        let file = document.querySelector('#file-input')
        
        form.addEventListener('submit', submitForm);
    }

    function submitForm(event) {
        let str = event.target.result;
        console.log('string', str)
        event.preventDefault()
        let file = document.querySelector('#file-input')

        if (!file.value.length) return;

        console.log("Form submitted!")

        var reader = new FileReader();
        reader.readAsText(file.files[0])
        reader.onload = function(event) {
            let str = event.target.result;
            let json = JSON.parse(str);
            //var fileContent = JSON.parse(reader.result)
            console.log('string', str);
            console.log('json', json)
        }

        

        /* fetch("http://localhost:3000/products/new", {
            method: 'POST',
            body: formDataJson
        })
            .then(checkStatus)
            .then(console.log)
            .catch(alert); */
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