const { Datatypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('routines', {
        name: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        staff: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        duration: {
            type: Datatypes.INTEGER,
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.INTEGER,
            validate: { min: 1, max: 5 },
            allowNull: false,
        },
        category: {
            type: Datatypes.ENUM('Hamstrings', 'Calves', 'Chest', 'Back', 'Shoulders', 'Triceps', 'Biceps','Forearms','Trapezius','Abs'),
            allowNull: false,
        },

    },
        {
            timestamps: false,
        }
    )
}