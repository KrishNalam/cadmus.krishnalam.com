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
                curr.onclick = function () {
                    openCity(event, x.name)
                }
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
function openCity(event, cityName) {
    let i, tabcontent, tablinks
    tabcontent = document.getElementsByClassName('msg')
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none'
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName('user')
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '')
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = 'block'
    event.currentTarget.className += ' active'
}

function runAll() {
    loadUsers()
    //document.getElementById('Dave').onclick = sepWords('dwe')
    //loadUsers()
}
