const sequelize=require('./index')
const {DataTypes } = require('sequelize');
const UserModel = sequelize.define('user', {
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    timestamps: false
})

module.exports={
    sequelize,
    UserModel
}