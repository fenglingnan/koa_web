const sequelize=require('./index')
const {DataTypes: {INTEGER, MEDIUMINT, STRING,TEXT}} = require('sequelize');
const CivilModel = sequelize.define('civil_laws',{
    id:{
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
        defaultValue:1
    },
    parent_id:{
        type: INTEGER,
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
    }
}, {
    timestamps: false
})
module.exports={
    sequelize,
    CivilModel
}