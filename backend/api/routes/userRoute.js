import express from 'express'
const userRoute = express.Router()
import { addUser } from '../controllers/userController.js'

userRoute.post('/create', addUser)

export default userRoute
