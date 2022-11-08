const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('routine', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        staff: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            get(){
                return this.getDataValue('duration') + ' minutos'
            }
        },
        difficulty: {
            type: DataTypes.INTEGER,
            validate: { min: 1, max: 5 },
            allowNull: false,
        },
        category: {
            type: DataTypes.ENUM('Cardio/Resistencia', 'Masa Muscular', 'Postura', 'Bajada de Peso', 'Definición'),
            allowNull: false,
        },
        day: {
            type: DataTypes.INTEGER,
            validate: { min: 1, max: 7 },
            allowNull: false,
        },
    },
        {
            timestamps: false,
        }
    )
}
