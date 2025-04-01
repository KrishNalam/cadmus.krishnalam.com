import { Sequelize, DataTypes } from 'sequelize'
//import { sequelize } from '../../index.js'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './chatApp.db',
})

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
})

export { User }
