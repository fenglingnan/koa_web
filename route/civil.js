const router =require('koa-router')()
const civil_router=require('koa-router')()
const {CivilModel} =require('../model/mysql_mod/civil_law_mod');
//此处使用sequelize原始查询必须有实例化之后sequelize
const sequelize  = require('../model/mysql_mod/index')
const UDF = require('../utils/sql_recursion')
console.log(typeof UDF.civil_rec,123)
//``返回的字符串需要去除\n，否则插入mysql报错
//const TEST = UDF.civil_rec.replace(/[\r\n]/g,'')
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
    try {
        const rec = await sequelize.query(UDF.civil_rec)
        console.log(123,rec)
    } catch (e) {
        console.log(e)
    }

    let result=await CivilModel.findAll(list)
    ctx.body=ctx.back({
        list:result?result:[]
    })
})

router.post('/civilContent',async (ctx,next)=>{
    await next()
    await ctx.get_key()
    let data=ctx.request.body
    if(!data.text&&!data.id){
        ctx.body=ctx.back(null,'参数错误',500)
        return
    }
    //目录选择查询
    if(data.id){
        let result = await CivilModel.findOne({
            where:{
                id:data.id
            }
        });
        console.log(result,JSON.stringify(result))
        let level=result.level
        return
    }
    //搜索查询

})
civil_router.use(router.routes())
module.exports=civil_router