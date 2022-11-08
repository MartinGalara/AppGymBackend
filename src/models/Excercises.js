const { Datatypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('excercises', {
        name: {
            type: Datatypes.STRING,
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
