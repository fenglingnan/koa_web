const captchapng = require('captchapng');
const router =require('koa-router')()
const {sequelize,UserModel} =require('../model/login_mod');
let IMGCODE;
router.get('/code', async (ctx,next) => {
    await next()
    // 生成加法形式的验证码
    // 生成验证码
    IMGCODE=parseInt(Math.random() * 9000 + 1000)
    var p = new captchapng(80, 30, IMGCODE); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    ctx.body=ctx.back({image:`data:image/jpg;base64,${img}`})
})
router.post('/login',async (ctx,next)=>{
    await next()
    // console.log(ctx.request.body)

    let data=ctx.request.body;
    let ip=ctx.ip
    let res=await sequelize.sync()
    const users = await UserModel.findOne({
        where:{
            username:data.username
        }
    });
    if(data.code!=IMGCODE){
        ctx.body=ctx.back(null,'验证码错误',500)
        return
    }
    if(!users||users.password!=data.password){
        ctx.body=ctx.back(null,'用户名或者密码错误',500)
        return
    }
    ctx.body=ctx.back(null,'登录成功')
});
module.exports=router