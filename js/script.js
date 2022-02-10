let user = ''

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
}

const loadMessages = (messages) => {
    messagesContent = ''
    messages.data.forEach(message => {
        messagesContent +=
            `<div class='message-content ${message.type}'>
                <p><time>${message.time}</time> <strong>${message.from}</strong> para <strong>${message.to}:</strong> <span>${message.text}</span></p>
            </div>`
    });

    document.querySelector(`.message-container`).innerHTML = messagesContent;
}