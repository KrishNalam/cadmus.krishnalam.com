import { Sequelize, DataTypes } from 'sequelize'

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
    sending: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
})

export { Chat }
