const list=require('./white')
const {client}=require('../model/redis_mod/index')
function res(){
    return async (ctx,next)=>{
        //获取token
        ctx.get_key=function (){
            return new Promise(((resolve, reject) => {
                client.hgetall(ctx.header.token,function (err,val){
                    if(!list.includes(ctx.url)){
                        if(err){
                            ctx.body = {
                                code:'501',
                                msg:'token错误',
                                data:null
                            }
                            reject(err)
                        }else{
                            resolve(val)
                        }
                    }
                })
            }))
        }

        // 全局通用返回
        ctx.back=function (data,msg,code){
            let obj={
                code:code||'200',
                data:data,
                msg:msg||'操作成功.'
            }
            return obj
        }
        await next()
    }
}
module.exports=res