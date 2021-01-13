const fs=require('fs')
const ini=require('ini')
const path= require('path')
var cfg=ini.parse(fs.readFileSync(process.cwd()+'/config/redis.ini',"utf-8"))
let redis = require("redis");
let client = redis.createClient({
    host:cfg.redis.host,
    port:cfg.redis.port,
    password:cfg.redis.password
});
client.on("error", function (err) {
    console.log("Error " + err);
});
client.on('ready',function (){
    console.log('成功')
})
// client.set('test','ok')
// client.get('a',function (err,data){
//     console.log(err,data)
// })
module.exports={
    client,
    expire:cfg.redis.expire
}