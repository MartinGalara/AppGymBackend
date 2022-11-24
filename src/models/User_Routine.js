const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('User_Routine', {
        favourite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        owned:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        paranoid: true,
    }
    )
}
