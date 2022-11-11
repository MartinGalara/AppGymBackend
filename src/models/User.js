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
            unique: true,
        },
        hashPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: { 
            type: DataTypes.STRING,
            defaultValue: "User",
        },
        imgUrl:{
            type: DataTypes.STRING,
            defaultValue: "asd",
        },
    },
        {
            timestamps: false,
        }
    )
}
