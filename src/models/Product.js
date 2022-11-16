const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 0 },
        },
        category: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        imgUrl:{
            type: DataTypes.STRING,
            defaultValue: "https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg",
        },
    },
        {
            timestamps: false,
        }
    )
}
