import { Sequelize, DataTypes } from 'sequelize'
//import { sequelize } from '../../index.js'

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
    // id: {
    //     type: DataTypes.INTEGER,
    //     // autoIncrement: true,
    //     primaryKey: true,
    //     // type: DataTypes.STRING,
    //     defaultValue: 1,
    // },
})

export { User }
