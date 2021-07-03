const sequelize=require('./index')
const {DataTypes: {INTEGER, MEDIUMINT, STRING, TEXT, TINYINT}} = require('sequelize');
const CivilModel = sequelize.define('civil_laws',{
    id:{
        type: STRING(50),
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
        defaultValue:1
    },
    parent_id:{
        type: STRING(50),
    },
    title:{
        type: STRING(180),
        allowNull: false,
    },
    level:{
        type: INTEGER,
        allowNull: false,
    },
    content:{
        type: STRING(1500),

    },
    title_support:{
        type: STRING(120),
    },
    last:{
        type: TINYINT(1),
        allowNull: false,
        defaultValue:0
    }
}, {
    timestamps: false
})
module.exports={
    sequelize,
    CivilModel
}