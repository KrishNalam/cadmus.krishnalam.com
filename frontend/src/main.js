document.addEventListener('DOMContentLoaded', runAll)

function load() {
    fetch('http://localhost:3000/user/readAll', { method: 'GET' })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Response was not ok')
            }
            return response.json()
        })
        .then((json) => {
            for (const x of json.allUsers) {
                const curr = document.createElement('div')
                const currContent = document.createElement('div')
                curr.innerText = x.name
                curr.classList.add('user')
                currContent.id = x.name
                currContent.innerText = x.name
                currContent.classList.add('header')
                curr.addEventListener('click', () => {
                    let i, allHistory, currEffect
                    allHistory = document.getElementsByClassName('header')
                    currEffect = document.getElementsByClassName('user')
                    for (i = 0; i < allHistory.length; i++) {
                        allHistory[i].style.display = 'none'
                        currEffect[i].className = currEffect[
                            i
                        ].className.replace(' active', '')
                    }
                    document.getElementById(x.name).style.display = 'flex'
                    curr.className += ' active'
                    loadMessages(x.name)
                })
                document.getElementById('sidebar').appendChild(curr)
                document.getElementById('display').appendChild(currContent)
            }
        })
}

function loadMessages(name) {
    const tester = {
        Dave: [
            {
                You: 'dew',
            },
            {
                Sender: 'Lmao',
            },
        ],
        Krish: [
            {
                You: 'Bruh',
            },
            {
                Sender: 'Lmao',
            },
        ],
        Mridul: [
            {
                You: 'Bruh',
            },
            {
                Sender: 'Lmao',
            },
        ],
        Mohammad: [
            {
                You: 'Bruh',
            },
            {
                Sender: 'Lmao',
            },
        ],
    }
    document.getElementById('messages').innerHTML = ''
    if (tester[name]) {
        for (let i = 0; i < tester[name].length; i++) {
            let msg = document.createElement('div')
            if (tester[name][i].You) {
                msg.innerText = tester[name][i].You
                msg.classList.add('you')
            }
            if (tester[name][i].Sender) {
                msg.innerText = tester[name][i].Sender
                msg.classList.add('sender')
            }
            document.getElementById('messages').appendChild(msg)
        }
    } else {
        const first = document.createElement('div')
        first.innerText = 'Send a message to start a conversation'
        first.classList.add('default')
        document.getElementById('messages').appendChild(first)
    }
    const send = document.createElement('input')
    send.placeholder = 'Send a message...'
    document.getElementById('messages').appendChild(send)
}

function signIn() {
    document
        .getElementsByClassName('title')[0]
        .addEventListener('click', () => {
            console.log('edhuji')
            document.getElementById('signedOut').style.display = 'none'
        })
}

// add User
// fetch('http://localhost:3000/user/create', requestOptions).then(
//     (response) => {
//         console.log(response)
//         if (!response.ok) {
//             console.log('wedyu')
//             throw new Error('Response was not ok')
//         }
//         return response.json()
//     }
// )

function runAll() {
    load()
    signIn()
}
