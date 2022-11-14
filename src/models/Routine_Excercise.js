const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Routine_Excercise', {
    },
    {
        timestamps: false,
    }
    )
}
