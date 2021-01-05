function res(){
    return async (ctx,next)=>{
        ctx.back=function (data,msg,code){
            let obj={
                code:code||'200',
                data:data,
                msg:msg||'query success.'
            }
            return obj
        }
        await next()
    }
}
module.exports=res