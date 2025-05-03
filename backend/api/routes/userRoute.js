import express from 'express'
const userRoute = express.Router()
import {
    addUser,
    findAllUsers,
    findUser,
} from '../controllers/userController.js'

userRoute.post('/create', addUser)
userRoute.get('/readAll', findAllUsers)
userRoute.get('/read', findUser)

export default userRoute
