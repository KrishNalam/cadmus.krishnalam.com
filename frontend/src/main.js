document.addEventListener('DOMContentLoaded', loadUsers)

const users = [
    {
        id: 'Krish Nalam',
        last_msg: 'You are a retard',
    },
    {
        id: 'Mohammad Anwar',
    },
]

function loadUsers() {
    document.getElementById('users').innerHTML = ''
    for (const x of users) {
        const curr = document.createElement('button')
        curr.innerHTML = x.id
        curr.classList.add('user')
        document.getElementById('users').appendChild(curr)
    }
}
