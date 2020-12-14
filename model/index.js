const fs=require('fs')
const ini=require('ini')
const path= require('path')
var cfg=ini.parse(fs.readFileSync(process.cwd()+'/config/mysql.ini',"utf-8"))
const {Sequelize } = require('sequelize');
var sequelize=new Sequelize(cfg.mysql.database,cfg.mysql.username,cfg.mysql.password,{
    host:cfg.mysql.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
})
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
    })
    .catch(err => {
        console.log('Unable to connect to the database', err)
    })
module.exports=sequelize