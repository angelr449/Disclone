const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/confing");


const ChatMember = sequelize.define('ChatMember',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    chat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },

},
{
    tableName: 'chat_members',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: 'joined_at',
});

module.exports = ChatMember;