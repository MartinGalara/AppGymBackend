const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('feedback', {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        score:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        disabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    )
}