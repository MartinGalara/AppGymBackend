const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('subscriptionSale', {
        purchaseId:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        totalCost: {
            type: DataTypes.DECIMAL,
        },
        approved:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        paymentMethod:{
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        daysToAdd: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        paranoid: true,
    }
    )
}
