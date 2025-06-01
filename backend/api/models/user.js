import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './chatApp.db',
})

const User = sequelize.define('User', {
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true,
    },
    pass: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
})

export { User }
