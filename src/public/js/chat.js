const socket = io();
const messageContainer = document.querySelector(".chat-box");

function sendMessage(ev) {
    if(ev.code !== 'Enter') return;
    let messageObj = { user: 'testing', message: ev.target.value };
    socket.emit("message", messageObj);
    createMessageBox("sent", messageObj);
}

function createMessageBox(type, messageObj){
    let messageBox = document.createElement('div');
    let messageTime = document.createElement('span');
    let message = document.createElement('p');

    messageTime.classList.add("time");
    messageBox.classList.add("message", type);

    message.textContent = messageObj.message;

    messageBox.append(message, messageTime);
    messageContainer.appendChild(messageBox);
}

// SOCKET EVENTS

socket.on("message", (messageObj) => createMessageBox("received", messageObj));