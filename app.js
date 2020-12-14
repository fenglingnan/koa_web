// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
// 创建一个Koa对象表示web app本身:
const app = new Koa();
//拆分路由
const router =require('./route/index')
// app.use(router())
app.use(router())
// 在端口8000监听:
app.listen(8000);

console.log('app started at port 8000...');