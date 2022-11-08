const { Datatypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('excercises', {
        name: {
            type: Datatypes.STRING,
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
