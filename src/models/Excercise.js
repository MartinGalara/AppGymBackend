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
            type: DataTypes.TEXT,
            defaultValue: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/186-shoulder-press-1-1550761001.gif",
        },
    },
        {
            paranoid: true,
        }
    )
}
