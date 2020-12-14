const combineRouters =require('koa-combine-routers')
const login=require('./login')
const user=require('./user')
const router = combineRouters(
    login,
    user
)
module.exports = router