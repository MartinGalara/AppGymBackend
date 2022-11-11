const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('User_Routine', {
        favourite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    },
        {
            timestamps: false,
        }
    )
}
