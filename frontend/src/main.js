'use strict'
document.addEventListener('DOMContentLoaded', runAll)
let loggedUser
function signIn() {
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            fetch(import.meta.env.VITE_BACKEND + 'user/read', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: document.getElementById('username').value,
                    pass: document.getElementById('password').value,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Response was not ok')
                    }
                    return response.json()
                })
                .then((loggedIn) => {
                    loggedUser = loggedIn
                    document.getElementById('signedOut').style.display = 'none'
                })
        }
    })
}

function populateUsers(allUsers) {
    for (let x of allUsers) {
        const user = document.createElement('div')
        user.innerText = x.name
        user.id = x.name
        user.classList.add('user')
        user.addEventListener('click', () => {
            const userSelect = document.getElementsByClassName('user')
            for (let i = 0; i < userSelect.length; i++) {
                userSelect[i].classList.remove('active')
            }
            user.className += ' active'
            document.getElementById('chatHeader').innerText = user.innerText
            document.getElementById('chatHeader').style.display = 'flex'
            loadMessages(x.name)
            sendMsg(x.name)
        })
        document.getElementById('sidebar').appendChild(user)
    }
}

function loadUsers() {
    fetch(import.meta.env.VITE_BACKEND + 'user/readAll', { method: 'GET' })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Response was not ok')
            }
            return response.json()
        })
        .then((allUsers) => {
            populateUsers(allUsers)
        })
}

function populateMgs(allMsgs) {
    document.getElementById('chatHistory').innerHTML = ''
    if (0 < allMsgs.length) {
        for (let i = 0; i < allMsgs.length; i++) {
            let msg = document.createElement('div')
            if (allMsgs[i].sender === loggedUser) {
                msg.innerText = allMsgs[i].message
                msg.classList.add('sending')
            } else {
                msg.innerText = allMsgs[i].message
                msg.classList.add('receiving')
            }
            document.getElementById('chatHistory').appendChild(msg)
        }
    } else {
        const first = document.createElement('div')
        first.innerText = 'Start a Conversation'
        first.classList.add('idleScreen')
        document.getElementById('chatHistory').appendChild(first)
    }
    document.getElementById('send').style.display = 'flex'
    document.getElementById('chatHistory').scrollTop =
        document.getElementById('chatHistory').scrollHeight
}

function loadMessages(name) {
    let convoId = [name, loggedUser].sort()
    fetch(
        import.meta.env.VITE_BACKEND +
            'chat/read?conversationId=' +
            `${convoId[0]}_${convoId[1]}`,
        {
            method: 'GET',
        }
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error('Response was not ok')
            }
            return response.json()
        })
        .then((allMsgs) => {
            populateMgs(allMsgs)
        })
}

function sendMsg(name) {
    let convoId = [name, loggedUser].sort()
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            fetch(import.meta.env.VITE_BACKEND + 'chat/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: document.getElementById('send').value,
                    conversationId: `${convoId[0]}_${convoId[1]}`,
                    receiver: name,
                    sender: loggedUser,
                }),
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Response was not ok')
                }
                loadMessages(name)
                document.getElementById('send').value = ''
                return response.json()
            })
        }
    })
}
function runAll() {
    signIn()
    loadUsers()
}
