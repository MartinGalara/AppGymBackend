const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('excercise', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        series: {
            type: Datatypes.INTEGER,
            allowNull: false,
        },
        repetitions: {
            type: Datatypes.INTEGER,
        },
    },
        {
            timestamps: false,
        }
    )
}
