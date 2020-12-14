const captchapng = require('captchapng');
const router =require('koa-router')()
const {sequelize,UserModel} =require('../model/login_mod');
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
})
router.get('/addrun',async (ctx,next)=>{
    await next()
    sequelize.sync().then(async ()=>{
        var now=new Date().getTime()
        var dog = await UserModel.create({
            firstName:now,
            lastName:236
        });
    });
    ctx.body={arr:'run'}
});
module.exports=router