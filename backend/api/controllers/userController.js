import User from './models/user'

async function addUser(name) {
    try {
        const user = await User.create({ name })
        console.log('User created:', user)
        return user
    } catch (error) {
        console.error('Error creating user:', error)
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

async function updateUser(id, name) {
    try {
        const user = await User.findByPk(id)
        if (user) {
            user.name = name
            await user.save()
            console.log('User updated:', user)
            return user
        } else {
            console.log('User not found')
        }
    } catch (error) {
        console.error('Error updating user:', error)
    }
}

async function deleteUser(id, name) {
    try {
        const user = await User.findByPk(id)
        if (user) {
            await user.destroy()
            console.log('User deleted')
            return { message: 'User deleted' } //used CHATGPT for this, might need explaining
        }
    } catch (error) {
        console.error('Error deleting user:', error)
    }
}
