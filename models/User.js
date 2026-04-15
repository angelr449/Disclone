const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/confing");


const User = sequelize.define('User', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,

    },

    avatar: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'users',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    underscored: true,
});


module.exports = User;