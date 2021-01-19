const captchapng = require('captchapng');
const router =require('koa-router')()
const login_router=require('koa-router')()
const {UserModel} =require('../model/mysql_mod/login_mod');
const md5=require('md5')
const {client,expire}=require('../model/redis_mod/index')
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
    let time=new Date().getTime()
    let time_key=md5(time)
    const users = await UserModel.findOne({
        where:{
            username:data.username
        }
    });
    UserModel.create({
        username:'123',
        password:'12345',
        log_ip:'127.0.0.1'
    })
    if(data.code!=IMGCODE){
        ctx.body=ctx.back(null,'验证码错误',500)
        return
    }
    if(!users||users.password!=data.password){
        ctx.body=ctx.back(null,'用户名或者密码错误',500)
        return
    }
    client.hmset(time_key, "user_id", users.user_id, "time", time);
    client.expire(time_key,expire);
    ctx.body=ctx.back({token:time_key},'登录成功')
});
login_router.use(router.routes())
module.exports=login_router