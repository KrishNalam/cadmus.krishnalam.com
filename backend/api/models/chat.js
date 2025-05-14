import { Sequelize, DataTypes } from 'sequelize'
import User from '/user.js'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './chatApp.db',
})

const Chat = sequelize.define('Chat', {
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sender: {
        type: User,
        allowNull: false,
    },
})
