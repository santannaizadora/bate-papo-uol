let user = ''
let type = 'message'
let lastMessage = ''
let textObj = {}
let to = 'Todos'
let selectedUser = 'Todos'
let returnedUser = undefined

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
    getOnlineUsers()
    addressee()
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

const filterMessages = (message) => {
    if (message.type == 'message' || message.type == 'status') {
        return true
    } else if (message.type == 'private_message' && (message.to == user || message.from == user)) {
        return true
    }
}

const loadMessages = (messages) => {
    messagesToView = messages.data.filter(filterMessages);
    messagesContent = '';
    messagesToView.forEach(message => {
        messagesContent +=
            `<div class='message-content ${message.type} data-identifier="message"'>
                <p>
                <time>(${message.time})</time>
                <span><strong class="name">${message.from}</strong> para <strong class="name">${message.to}:</strong></span>
                <span class="text"> ${message.text}</span></p>
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
        to: `${to}`,
        text: `${text}`,
        type: `${type}`
    }
    if (textObj.text != '') {
        axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', textObj)
            .then(attMessagesAfterSending)
            .catch(errorSendingMessage)
        cleanTextArea()
    }
}

const attMessagesAfterSending = () => {
    axios.get('https://mock-api.driven.com.br/api/v4/uol/messages')
        .then(loadMessages)
}

const cleanTextArea = () => {
    document.querySelector('.send').value = ''
}

const errorSendingMessage = () => {
    window.location.reload()
}

const getOnlineUsers = () => {
    axios.get('https://mock-api.driven.com.br/api/v4/uol/participants')
        .then(loadOnlineUsers)
    reloadOnlineUsers()
}

const reloadOnlineUsers = () => {
    setInterval(() => {
        axios.get('https://mock-api.driven.com.br/api/v4/uol/participants')
            .then(loadOnlineUsers)
    }, 10000);
}

const showOnlineUsers = () => {
    const sidebar = document.querySelector('aside')
    sidebar.classList.remove('hide')
}

const loadOnlineUsers = (users) => {
    returnedUser = users.data.find(findSelectedUser)
    onlineUsers = ''
    users.data.forEach(user => {
        onlineUsers +=
            `<div class="user" onclick="chooseUser(this)" data-identifier="participant">
                <div class="username">
                <ion-icon name="person-circle"></ion-icon>
                <p>${user.name}</p>
                </div>
                <div><ion-icon class="check hide" name="checkmark-sharp"></ion-icon></div>
            </div>`
    });
    document.querySelector(`.users`).innerHTML = onlineUsers;
    reloadUserSelected()
}

const findSelectedUser = (user) => {
    return user.name === selectedUser
}

const reloadUserSelected = () => {

    if (returnedUser == undefined) {
        const all = document.getElementById('all');
        all.classList.add('selected')
        const check = document.querySelector(`.user.selected .check`);
        check.classList.remove('hide')
        to = 'Todos'
        selectedUser = 'Todos'
    } else {
        let onlineUsers = document.querySelectorAll('.user')
        onlineUsers.forEach(user => {
            if (user.innerText == selectedUser) {
                user.classList.add('selected')
                const check = document.querySelector(`.user.selected .check`);
                check.classList.remove('hide')
            }
        })
    }

    addressee()
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
    to = user.innerText
    selectedUser = user.innerText
    addressee()
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
    if (visibility.innerText == 'Público') {
        type = 'message'
    } else {
        type = 'private_message'
    }
    addressee()
}

const addressee = () => {
    let addressee = document.querySelector(`.addressee`)
    if (type == 'message') {
        addressee.innerText = `Enviando para ${to} (público)`
    } else {
        addressee.innerText = `Enviando para ${to} (reservadamente)`
    }
}

const hideSidebar = () => {
    const sidebar = document.querySelector('aside')
    sidebar.classList.add('hide')
}