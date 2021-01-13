const sequelize=require('./index')
const {DataTypes } = require('sequelize');
const UserModel = sequelize.define('user', {
    // Model attributes are defined here
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true
    },
    log_ip:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports={
    sequelize,
    UserModel
}