import { User } from '.././models/user.js'

async function addUser(req, res) {
    console.log(req.body)
    try {
        await User.sync()
        const user = await User.create(req.body)
        res.status(201).json({ message: 'User created successfully', user })
    } catch (error) {
        console.error('Error creating user:', error)
        res.status(500).json({
            message: 'Failed to create user',
            error: error.message,
        })
    }
}

async function findUser(id) {
    try {
        const user = await User.findByPk(id)
        if (user) {
            console.log('User found:', user)
            return user
        } else {
            console.log('User not found')
        }
    } catch (error) {
        console.error('Error retrieving user:', error)
    }
}

async function findAllUsers(req, res) {
    try {
        const allUsers = await User.findAll()
        res.status(200).json({
            message: 'All users read successfully',
            allUsers,
        })
    } catch (error) {
        console.error('Error retrieving user:', error)
        res.status(500).json({
            message: 'Failed to read all users',
            error: error.message,
        })
    }
}

// async function updateUser(id, name) {
//     try {
//         const user = await User.findByPk(id)
//         if (user) {
//             user.name = name
//             await user.save()
//             console.log('User updated:', user)
//             return user
//         } else {
//             console.log('User not found')
//         }
//     } catch (error) {
//         console.error('Error updating user:', error)
//     }
// }

// async function deleteUser(id, name) {
//     try {
//         const user = await User.findByPk(id)
//         if (user) {
//             await user.destroy()
//             console.log('User deleted')
//             return { message: 'User deleted' } //used CHATGPT for this, might need explaining
//         }
//     } catch (error) {
//         console.error('Error deleting user:', error)
//     }
// }
export { addUser, findAllUsers, findUser }
