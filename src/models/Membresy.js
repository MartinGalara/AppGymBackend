const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('membresy', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalCost: {
            type: DataTypes.FLOAT,
            validate: { min: 0 },
            allowNull: false,
        },
        saving: {
            type: DataTypes.FLOAT,
            validate: { min: 0 },
        },
        daysToAdd: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
        {
            paranoid: true,
        }
    )
}