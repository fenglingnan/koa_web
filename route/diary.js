const router =require('koa-router')()
const diary_router=require('koa-router')()
const {DiaryModel} =require('../model/mysql_mod/diary_mod');
const {UserModel} =require('../model/mysql_mod/login_mod');
const moment=require('moment')
router.get('/diaryList',async (ctx,next)=>{
    await next()
    let res=await ctx.get_key()
    console.log(ctx.query)
    const count =await DiaryModel.count({
        where:{
            u_id:res.user_id
        },
    })
    const list=await DiaryModel.findAll({
        where:{
            u_id:res.user_id
        },
        offset:((ctx.query.page_cur-1)*Number(ctx.query.page_size)),
        limit : Number(ctx.query.page_size)
    })
    ctx.body=ctx.back({
        list:list,
        page_total:count
    })
})
router.post('/diaryAdd',async (ctx,next)=>{
    await next()
    let data=ctx.request.body
    let res=await ctx.get_key()
    const users = await UserModel.findOne({
        where:{
            user_id:res.user_id
        }
    });
    const diary=await DiaryModel.create({
        u_id:res.user_id,
        body:data.txt,
        time:moment().utcOffset("+00:00").format('YYYY-MM-DD HH:mm:ss'),
        src:users.head_img,
        user_name:users.username
    })
    ctx.body=ctx.back(null)
})
diary_router.use(router.routes())
module.exports=diary_router