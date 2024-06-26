const socket = io('ws://localhost:3500')

function sendMessage(e) {
    e.preventDefault()
    const input = document.querySelector('input')
    if (input.value) {
        socket.emit('message', input.value)
        input.value = ""
    }
    input.focus()
}

function nextPerson() {
    socket.emit('nextPerson');
}

document.querySelector('form')
    .addEventListener('submit', sendMessage)

// Listen for messages 
socket.on("message", (data) => {
    const li = document.createElement('li')
    li.textContent = data
    document.querySelector('ul').appendChild(li)
})

// Listen for current person updates
socket.on("currentPerson", (data) => {
    document.getElementById("currentPerson").innerText = data;
    console.log(data)
});

// Listen for updated people list
socket.on("peopleList", (data) => {
    const listItems = data.map((person, index) => {
        if (index === currentIndex) {
            document.getElementById("peopleList").innerHTML = `<li><strong>${person}</strong></li>`;
        } else {
            document.getElementById("peopleList").innerHTML = `<li>${person}</li>`;
        }
    });
  
    document.getElementById("peopleList").innerHTML = listItems.join("");
});
