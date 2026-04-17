const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/confing");



const Chat = sequelize.define('Chat', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: false
    },

},{
    tableName: 'chats',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    underscored: true,
});

module.exports = Chat;