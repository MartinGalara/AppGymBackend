const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING,
        },
        role: { 
            type: DataTypes.STRING,
            defaultValue: "User",
            allowNull: false,
        }
    },
        {
            timestamps: false,
        }
    )
}
