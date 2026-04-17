const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/confing");


const FriendRequestStatus = sequelize.define('FriendRequestStatus',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        }
    },
    {
        tableName:"friend_request_status",
        schema: 'public'
    }
)

module.exports  = FriendRequestStatus;