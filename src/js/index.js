//index.js
import  '../index.html'
const greeter = require('./greeter.js');
import  '../css/index.css';//引入css
import '../less/myless.less' //引入less
document.querySelector("#root").appendChild(greeter())
// let a = 'hell4o world';
// document.body.innerHTML = a;
// console.log('这是webpack打包的入口文件3');
console.log('module.hot:',module.hot)

// 还需要在主要的js文件里写入下面这段代码
if (module.hot) {
    // 实现热更新
    module.hot.accept();
}


// const express = require('express')
// const app = express()//请求server
// var appData = require('../data.json')//加载本地数据文件
// var seller = appData.seller//获取对应的本地数据
// console.log(seller)
// //var goods = appData.goods
// var ratings = appData.ratings
// var apiRoutes = express.Router()
// app.use('/api', apiRoutes)//通过路由请求数
// console.log('999999999')
// app.get('/myresume/index',(req,res) => {
// res.send({m:'hello'})
// })
require("expose-loader?$!jquery");
console.log('here:',$("#root"))


$.ajax({
    type: "get",
    url: "/myresume/index",
    data: "",
    success: function(data){
      console.log('success:',data.m)
        console.log('testobj:',$("#test"))
        //$("#test").className=data.m
        $("#test").html('<h2>'+data.m+'</h2>');

    }
});
// $.ajax({ url: "/myresume/index", context: document.body, success: function(){
//         console.log('8888888')
//     }});