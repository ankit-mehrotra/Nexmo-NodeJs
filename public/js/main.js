const numberInput = document.getElementById('number'),
      textInput = document.getElementById('msg'),
      button = document.getElementById('send'),
      response = document.querySelector('.response');

button.addEventListener('click', send, false);
const socket = io();
socket.on('smsdata', data => {
    response.innerHTML = `<h5> Text message send to ${data.number} </h5>`;
})

function send() {
    const number = numberInput.value.replace('/\D/g','');
    const text = textInput.value;
    fetch('/', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({number,text})
    }).then(res => res.json())
    .then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err);
    })
}