const { DataTypes } = require('sequelize');

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
            type: DataTypes.TEXT,
            defaultValue: "https://wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg",
        },
        averageScore:{
            type: DataTypes.FLOAT,
        },
        membresyExpDate:{
            type: DataTypes.STRING,
            get(){
                const stringToDate = new Date(Date.parse(this.getDataValue('membresyExpDate')))
                return stringToDate
            }
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
