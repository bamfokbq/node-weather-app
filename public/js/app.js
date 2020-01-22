const weatherform = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message__one')
const messageTwo = document.querySelector('#message__two');
const messageBox = document.querySelector('.message__box');




weatherform.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    // Default input
    messageBox.style.display = "block";
    messageOne.textContent = "Loading...";
    messageTwo.textContent = " ";
    // Fetching from the server
    fetch(`weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageBox.style.display = "block";
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
        messageOne.textContent = ""
        messageTwo.textContent = ""
        messageBox.style.display = "none";


    })
})