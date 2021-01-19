const sequelize=require('./index')
const {DataTypes: {INTEGER, MEDIUMINT, STRING,TEXT}} = require('sequelize');
const DiaryModel = sequelize.define('diarys', {
    // Model attributes are defined here
    id:{
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
        defaultValue:0
    },
    u_id:{
        type: INTEGER,
        allowNull: false,
    },
    body: {
        type: MEDIUMINT,
        allowNull: false
    },
    time: {
        type: STRING,
        allowNull: false
        // allowNull defaults to true
    },
    src:{
        type: MEDIUMINT,
        allowNull: false
    },
    user_name:{
        type:TEXT,
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports={
    sequelize,
    DiaryModel
}