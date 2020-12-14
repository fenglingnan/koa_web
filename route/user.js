const router=require('koa-router')();

router.get('/captcha',async (ctx,next)=>{
    await next();
    ctx.body={a:2}
})
module.exports=router