const sequelize=require('./index')
const {DataTypes: {INTEGER, MEDIUMINT, STRING}} = require('sequelize');
const DiaryModel = sequelize.define('user', {
    // Model attributes are defined here
    id:{
        type: INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    body: {
        type: MEDIUMINT,
        allowNull: false
    },
    time: {
        type: STRING,
        allowNull: false
        // allowNull defaults to true
    }
}, {
    timestamps: false
})

module.exports={
    sequelize,
    DiaryModel
}