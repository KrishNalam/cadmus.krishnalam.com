import express from 'express'
import sqlite3 from 'sqlite3'
import { Sequelize } from 'sequelize'

new sqlite3.Database('./chatApp.db')

const sequelize = new Sequelize({ dialect: 'sqlite', storage: './chatApp.db' })

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

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
