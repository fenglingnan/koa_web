const router =require('koa-router')()
const civil_router=require('koa-router')()
const {CivilModel} =require('../model/mysql_mod/civil_law_mod');

router.get('/civilTree',async (ctx,next)=>{
    await next()
    await ctx.get_key()
    let list
    if(ctx.query.id){
        list={
            where:{
                parent_id:ctx.query.id
            }
        }
    }else{
        list={
            where:{
                level:1
            }
        }
    }
    let result=await CivilModel.findAll(list)

    console.log(ctx.query)

    ctx.body=ctx.back({
        list:result?result:[]
    })
})
civil_router.use(router.routes())
module.exports=civil_router