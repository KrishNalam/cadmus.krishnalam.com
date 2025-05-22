document.addEventListener('DOMContentLoaded', runAll)

function loadUsers() {
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
    fetch('http://localhost:3000/chat/read?conversationId=' + name, {
        method: 'GET',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Response was not ok')
            }
            return response.json()
        })
        .then((json) => {
            document.getElementById('messages').innerHTML = ''
            if (0 < json.allMsgs.length) {
                for (let i = 0; i < json.allMsgs.length; i++) {
                    let msg = document.createElement('div')
                    if (json.allMsgs[i].sending) {
                        msg.innerText = json.allMsgs[i].message
                        msg.classList.add('you')
                    } else {
                        msg.innerText = json.allMsgs[i].message
                        msg.classList.add('sender')
                    }
                    document.getElementById('messages').appendChild(msg)
                }
            } else {
                const first = document.createElement('div')
                first.innerText = 'Start a Conversation'
                first.classList.add('default')
                document.getElementById('messages').appendChild(first)
            }
            const send = document.createElement('input')
            send.placeholder = 'Send a message...'
            send.id = 'send'
            document.getElementById('messages').appendChild(send)
        })
}

function signIn() {
    document
        .getElementsByClassName('title')[0]
        .addEventListener('click', () => {
            document.getElementById('signedOut').style.display = 'none'
        })
}

// function sendMsg() {
//     document.addEventListener('keydown', () => {
//         console.log('dewio')
//     })
// }
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
// // )
// const tester = {
//     Dave: [
//         {
//             You: 'dew',
//         },
//         {
//             Sender: 'Lmao',
//         },
//     ],
//     Krish: [
//         {
//             You: 'Bruh',
//         },
//         {
//             Sender: 'Lmao',
//         },
//     ],
//     Mridul: [
//         {
//             You: 'Bruh',
//         },
//         {
//             Sender: 'Lmao',
//         },
//     ],
//     Mohammad: [
//         {
//             You: 'Bruh',
//         },
//         {
//             Sender: 'Lmao',
//         },
//     ],
// }

function runAll() {
    loadUsers()
    // signIn()
    //console.log(callMessages())

    // sendMsg()
}
