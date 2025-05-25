document.addEventListener('DOMContentLoaded', runAll)

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
    fetch('http://localhost:3000/user/readAll', { method: 'GET' })
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
            if (allMsgs[i].sending) {
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
    fetch('http://localhost:3000/chat/read?conversationId=' + name, {
        method: 'GET',
    })
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
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            fetch('http://localhost:3000/chat/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: document.getElementById('send').value,
                    conversationId: name,
                    sending: true,
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

function signIn() {
    document.getElementById('welcome').addEventListener('click', () => {
        document.getElementById('signedOut').style.display = 'none'
    })
}

function runAll() {
    loadUsers()
    signIn()
}
