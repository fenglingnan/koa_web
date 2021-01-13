// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
// 创建一个Koa对象表示web app本身:
const app = new Koa();
//解析post/body
const bodyParser = require('koa-bodyparser');
//拆分路由
const router =require('./route/index')
const err=require('./route/error')
const res=require('./responese/index')
app.proxy=true
app.use(bodyParser());
app.use(err())
app.use(res())
app.use(router())

// 在端口8000监听:
app.listen(8000);

console.log('app started at port 8000...');