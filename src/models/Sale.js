const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('sale', {
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
        }
    },
    {
        paranoid: true,
    }
    )
}
