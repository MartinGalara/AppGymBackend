const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('excercise', {
        day:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1, max: 7}
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        series: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        repetitions: {
            type: DataTypes.INTEGER,
        },
    },
        {
            timestamps: false,
        }
    )
}
