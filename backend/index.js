import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'
import { Sequelize } from 'sequelize'
import userRoute from './api/routes/userRoute.js'
//import { addUser } from './api/controllers/chatController'

new sqlite3.Database('./chatApp.db')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './chatApp.db',
})
await sequelize.sync({ force: true })

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/user', userRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//TEST: connection between sequlize and database
try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
} catch (error) {
    console.error('Unable to connect to the database:', error)
}
