const err=(data={})=>{
    return async (ctx,next)=>{
        try{
            await next();   // 执行后代的代码
            if(!ctx.body){  // 没有资源
                ctx.status = 404;
                ctx.body = {
                    code:'404',
                    msg:'not found',
                    data:null
                }
            }
        }catch(e){
            // 如果后面的代码报错 返回500
            ctx.status=500
            ctx.body = {
                code:'500',
                msg:'系统错误',
                data:e
            }
        }
    }
}
module.exports=err