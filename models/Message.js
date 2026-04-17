const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/confing");

const Message = sequelize.define('Message',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    },
    chat_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sender_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false,
    },

},
{
    tableName: 'messages',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    underscored: true,
});

module.exports = Message;