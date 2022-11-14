const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('routine', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.INTEGER,
            validate: { min: 1, max: 5 },
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        flag:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        favByUser:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
        {
            timestamps: false,
        }
    )
}
