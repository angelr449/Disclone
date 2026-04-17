const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/confing");


const Friend = sequelize.define('Friend', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    requester_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

}, {
    tableName: "friends",
    schema: "public",
    timestamps: true,
    paranoid: true,
    underscored: true,

});

module.exports = Friend;