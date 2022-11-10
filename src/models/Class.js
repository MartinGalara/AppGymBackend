const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('class', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        instructor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
        },
    },
        {
            timestamps: false,
        }
    )
}
