import { Sequelize, DataTypes } from 'sequelize'
import sequelize from '../../index.js'
import User from '/user.js'

const Chat = sequelize.define('Chat', {
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sender: {
        type: User,
    },
    receiever: {
        type: User,
    },
})
