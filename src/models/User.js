const { DataTypes, DATE } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        hashPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: { 
            type: DataTypes.STRING,
            defaultValue: "User",
        },
        imgUrl:{
            type: DataTypes.STRING,
            defaultValue: "https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg",
        },
        averageScore:{
            type: DataTypes.FLOAT,
        },
        membresyExpDate:{
            type: DataTypes.STRING,
        },
        expiredMembresy:{
            type: DataTypes.BOOLEAN,
        }
    },
        {
            paranoid: true,
        }
    )
}
