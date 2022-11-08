const { Datatypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('routines', {
        muscle: {
            type: Datatypes.STRING,
            allowNull: false,
        },
    },
        {
            timestamps: false,
        }
    )
}
