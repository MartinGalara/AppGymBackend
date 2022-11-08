const { Datatypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('excercises', {
        name: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        nickname: {
            type: Datatypes.STRING,
        },
        role: { 
            type: Datatypes.STRING,
            defaultValue: "User",
            allowNull: false,
        }
    },
        {
            timestamps: false,
        }
    )
}
