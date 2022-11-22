const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('class', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    },
        {
            paranoid: true,
        }
    )
}
