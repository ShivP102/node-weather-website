
const weatherform = document.querySelector('form')
const search = document.querySelector('input');
const message1 = document.querySelector('.message1')
const message2 = document.querySelector('.message2')

weatherform.addEventListener('submit', (event) => {
    event.preventDefault()

    const searchValue = search.value;

    message1.textContent = 'Loading....'
    message2.textContent = ''

    fetch(`http://localhost:3000/weather?address=${searchValue}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            message1.textContent = data.error;
        } else {
            message1.textContent = data.location;
            message2.textContent = data.forecast;
        }
    })
})
})