const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('excercise', {
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
