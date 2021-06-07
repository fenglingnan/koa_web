const router=require('koa-router')({
    prefix:'/api'
})
const login=require('./login')
const user=require('./user')
const diary=require('./diary')
const civil=require('./civil')
router.use('/login',login.routes())
    .use('/user',user.routes())
    .use('/diary',diary.routes())
    .use('/civil',civil.routes())
module.exports = router