const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('feedback', {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        score:{
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        disabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    )
}