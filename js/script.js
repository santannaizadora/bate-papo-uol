let user = ''
let lastMessage = ''
let textObj = {}

const sendWithEnter = (buttonId) => {
    if (event.keyCode == 13) {
        document.getElementById(`${buttonId}`).click()
    }
}

const enterChat = () => {
    user = document.querySelector('.log-user').value
    loadingToEnter()
    axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', { name: user })
        .then(successEnterChat)
        .catch(errorEnterChat)
}

const successEnterChat = () => {
    keepConection()
    const chat = document.querySelector('.login-screen')
    chat.classList.add('hide')
    getMessages()
}

const errorEnterChat = () => {
    const error = document.querySelector('.login-screen-error')
    error.classList.remove('hide')
    errorWhenLoadingToEnter()
}

const loadingToEnter = () => {
    const login = document.querySelector('.login')
    login.classList.add('hide')
    const loading = document.querySelector('.loading')
    loading.classList.remove('hide')
}

const errorWhenLoadingToEnter = () => {
    const login = document.querySelector('.login')
    login.classList.remove('hide')
    const loading = document.querySelector('.loading')
    loading.classList.add('hide')
}

const keepConection = () => {
    setInterval(() => {
        axios.post('https://mock-api.driven.com.br/api/v4/uol/status', { name: user })
    }, 5000);

}

const getMessages = () => {
    axios.get('https://mock-api.driven.com.br/api/v4/uol/messages')
        .then(loadMessages)
    reloadMessages()
}

const reloadMessages = () => {
    setInterval(() => {
        axios.get('https://mock-api.driven.com.br/api/v4/uol/messages')
            .then(loadMessages)
    }, 3000);
}

const loadMessages = (messages) => {
    messagesContent = ''
    messages.data.forEach(message => {
        messagesContent +=
            `<div class='message-content ${message.type}'>
                <p>
                <time>(${message.time})</time>
                <span class="infos" ><strong>${message.from}</strong> para <strong>${message.to}:</strong></span>
                <span>${message.text}</span></p>
            </div>`
    });
    document.querySelector(`.message-container`).innerHTML = messagesContent;
    scrollMessages()
}

const scrollMessages = () => {
    const message = document.querySelectorAll('.message-content')
    const messageContent = message[message.length - 1]
    if (messageContent.innerHTML != lastMessage) {
        messageContent.scrollIntoView()
        lastMessage = messageContent.innerHTML
    }
}

const sendMessage = () => {
    let text = document.querySelector('.send').value
    textObj = {
        from: `${user}`,
        to: "Todos",
        text: `${text}`,
        type: "message"
    }

    axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', textObj)
        .then(attMessagesAfterSending)
        .catch(errorSendingMessage)
    cleanTextArea()
}

const attMessagesAfterSending = () => {
    axios.get('https://mock-api.driven.com.br/api/v4/uol/messages')
        .then(loadMessages)
}

const cleanTextArea = () => {
    document.querySelector('.send').value = ''
}

const errorSendingMessage = () => {
    if (document.querySelector('.send').value != '') {
        window.location.reload()
    }
}

const loadOnlineUsers = () => {
    axios.get('https://mock-api.driven.com.br/api/v4/uol/participants')
        .then(showOnlineUsers)
}

const showOnlineUsers = (users) => {
    const sidebar = document.querySelector('aside')
    sidebar.classList.remove('hide')
    onlineUsers = `<div class="user selected" onclick="chooseUser(this)">
                        <div class="username">
                            <ion-icon name="people"></ion-icon>
                            <p>Todos</p>
                        </div>
                        <div><ion-icon class="check" name="checkmark-sharp"></ion-icon></div>                       
                    </div>`
    users.data.forEach(user => {
        onlineUsers +=
            `<div class="user" onclick="chooseUser(this)">
                <div class="username">
                    <ion-icon name="person-circle"></ion-icon>
                    <p>${user.name}</p>
                </div>
                <div><ion-icon class="check hide" name="checkmark-sharp"></ion-icon></div>
            </div>`
    });
    document.querySelector(`.online-users`).innerHTML = onlineUsers;
}

const hideSidebar = () => {
    const sidebar = document.querySelector('aside')
    sidebar.classList.add('hide')
}

const chooseUser = (user) => {
    const selected = document.querySelector(`.user.selected`);
    const check = document.querySelector(`.user.selected .check`);
    const newSelected = user;
    const newCheck = user.querySelector('.check');
    if (selected !== null) {
        selected.classList.remove("selected");
        check.classList.add('hide')
    }
    newSelected.classList.add("selected");
    newCheck.classList.remove('hide')
}

const chooseVisibility = (visibility) => {
    const selected = document.querySelector(`.visibility-type.selected`);
    const check = document.querySelector(`.visibility-type.selected .check`);
    const newSelected = visibility;
    const newCheck = visibility.querySelector('.check');
    if (selected !== null) {
        selected.classList.remove("selected");
        check.classList.add('hide')
    }
    newSelected.classList.add("selected");
    newCheck.classList.remove('hide')
}