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
            for (const x of json.allUsers) {
                const curr = document.createElement('div')
                curr.innerHTML = x.name
                curr.classList.add('user')
                curr.id = x.name
                document.getElementById('users').appendChild(curr)
                console.log(curr.getAttribute('id'))
            }
        })
}

function sepWords(name) {
    document.getElementById('messages').innerHTML = name
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
    document.getElementById('Dave').onclick = sepWords('dwe')
    //loadUsers()
}
