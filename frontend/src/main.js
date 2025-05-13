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
            document.getElementById('users').innerHTML = ''
            document.getElementById('messages').innerHTML = ''
            for (const x of json.allUsers) {
                const curr = document.createElement('div')
                const currContent = document.createElement('div')
                curr.innerText = x.name
                curr.classList.add('user')
                currContent.id = x.name
                currContent.innerText = x.name
                currContent.classList.add('msg')
                curr.addEventListener('click', () => {
                    let i, allHistory, currEffect
                    allHistory = document.getElementsByClassName('msg')
                    for (i = 0; i < allHistory.length; i++) {
                        allHistory[i].style.display = 'none'
                    }
                    currEffect = document.getElementsByClassName('user')
                    for (i = 0; i < currEffect.length; i++) {
                        currEffect[i].className = currEffect[
                            i
                        ].className.replace(' active', '')
                    }
                    document.getElementById(x.name).style.display = 'unset'
                    curr.className += ' active'
                })
                document.getElementById('users').appendChild(curr)
                document.getElementById('messages').appendChild(currContent)
            }
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
    loadUsers()
}
