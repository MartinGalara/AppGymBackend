const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('muscle', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
        {
            timestamps: false,
        }
    )
}
