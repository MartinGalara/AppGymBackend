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
        gifUrl: {
            type: DataTypes.STRING,
            defaultValue: "https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg",
        },
    },
        {
            timestamps: false,
        }
    )
}
