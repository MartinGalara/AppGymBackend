const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('membresy', {
        name: {
            type: DataTypes.ENUM('Golden Pass', 'Silver Pass', 'Bronce Pass', 'Month Pass', 'Trial'),
            allowNull: false,
            //lo trabamos o se lo destrabamos al admin
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        expiration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            get(){
                getDataValue('expiration') + ' meses';
            }
        },
        //hablar el tema de beneficios
    },
        {
            timestamps: false,
        }
    )
}