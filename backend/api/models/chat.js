import { Sequelize, DataTypes } from 'sequelize'
import { Json } from 'sequelize/lib/utils'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './chatApp.db',
})

const Chat = sequelize.define('Chat', {
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    conversationId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    receiver: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

export { Chat }
