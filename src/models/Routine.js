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
        imgUrl: {
            type: DataTypes.TEXT,
            defaultValue: "https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg",
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
            paranoid: true,
        }
    )
}
