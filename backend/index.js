import express from 'express'
import cors from 'cors'
import sqlite3 from 'sqlite3'
import { Sequelize } from 'sequelize'
import userRoute from './api/routes/userRoute.js'
import chatRoute from './api/routes/chatRoute.js'

new sqlite3.Database('./chatApp.db')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './chatApp.db',
})
await sequelize.sync({ force: true })

//TEST: connection between sequelize and database
try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
} catch (error) {
    console.error('Unable to connect to the database:', error)
}

const app = express()
const port = 8080

var allowlist = ['http://localhost:5173', 'https://cadmus.krishnalam.com']

var corsOptionsDelegate = function (req, callback) {
    var corsOptions
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate))
app.use(express.json())

app.use('/user', userRoute)
app.use('/chat', chatRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
