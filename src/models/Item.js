const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('item', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        unit_price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 0 },
        },
    },
        {
            paranoid: true,
        }
    )
}
