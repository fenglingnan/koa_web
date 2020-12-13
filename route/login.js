const captchapng = require('captchapng');
const bodyParser = require('koa-bodyparser');
const ini=require('ini')
const fs=require('fs')
const {Sequelize,DataTypes } = require('sequelize');
var cfg=ini.parse(fs.readFileSync('./config/mysql.ini',"utf-8"))
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
var sequelize=new Sequelize(cfg.mysql.database,cfg.mysql.username,cfg.mysql.password,{
    host:cfg.mysql.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
})
sequelize.sync().then(()=>{
    (async () => {
        var now=new Date().getTime()
        var dog = await UserModel.create({
            firstName:123,
            lastName:236
        });
    })();
});
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
    })
    .catch(err => {
        console.log('Unable to connect to the database', err)
    })
router.get('/code', async (ctx,next) => {
    await next()
    // 生成加法形式的验证码

    // 生成验证码
    var p = new captchapng(80, 30, parseInt(Math.random() * 9000 + 1000)); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    // console.log(img)
    ctx.body=`data:image/jpg;base64,${img}`
});

router.get('/captcha',async (ctx,next)=>{
    ctx.set("Content-Type", "application/json")
    ctx.body = {A:2}
})