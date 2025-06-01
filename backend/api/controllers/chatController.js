import { Chat } from '.././models/chat.js'

async function addMsg(req, res) {
    try {
        await Chat.sync()
        const msg = await Chat.create(req.body)
        res.status(201).json({ message: 'Message created successfully', msg })
    } catch (error) {
        console.error('Error creating message:', error)
        res.status(500).json({
            message: 'Failed to create message',
            error: error.message,
        })
    }
}

async function getMsgs(req, res) {
    try {
        const allMsgs = await Chat.findAll({
            where: { conversationId: req.query.conversationId },
        })
        res.status(200).json(allMsgs)
    } catch (error) {
        console.error('Error retrieving message:', error)
        res.status(500).json({
            message: 'Failed to read all messages',
            error: error.message,
        })
    }
}

export { addMsg, getMsgs }
