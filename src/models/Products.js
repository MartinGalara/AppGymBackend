const { Datatypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('products', {
        name: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        price: {
            type: Datatypes.INTEGER,
            allowNull: false,
        },
        stock: {
            type: Datatypes.INTEGER,
            allowNull: false,
            validate: { min: 0 },
        },
        category: {
            type: Datatypes.STRING,
        },
    },
        {
            timestamps: false,
        }
    )
}
