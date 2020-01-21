const weatherform = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message__one')
const messageTwo = document.querySelector('#message__two')


weatherform.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    // Default input
    messageOne.textContent = "Loading......";
    messageTwo.textContent = " ";
    // Fetching from the server
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
        messageOne.textContent = ""
        messageTwo.textContent = ""

    })
})