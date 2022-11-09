const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('day', {
        dayOfWeek: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
        {
            timestamps: false,
        }
    )
}
