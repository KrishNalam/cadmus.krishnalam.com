import express from 'express'
const chatRoute = express.Router()
import { addMsg, getMsgs } from '../controllers/chatController.js'

chatRoute.post('/create', addMsg)
chatRoute.get('/read', getMsgs)

export default chatRoute
