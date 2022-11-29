const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('class', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hour: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        day: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        {
            paranoid: true,
        }
    )
}
