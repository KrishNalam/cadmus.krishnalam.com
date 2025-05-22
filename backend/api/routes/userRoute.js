import express from 'express'
const userRoute = express.Router()
import { addUser, findAllUsers } from '../controllers/userController.js'

userRoute.post('/create', addUser)
userRoute.get('/readAll', findAllUsers)

export default userRoute
