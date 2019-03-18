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