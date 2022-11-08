const { Datatypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('muscle', {
        name: {
            type: Datatypes.STRING,
            allowNull: false,
        },
    },
        {
            timestamps: false,
        }
    )
}
