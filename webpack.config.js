const path = require('path')
const Webpack = require('webpack');//引入webpacke
const HtmlWebpackPlugin = require('html-webpack-plugin'); //配置Html模板
const CleanWebpackPlugin = require('clean-webpack-plugin');//用于在构建前清除dist目录中的内容
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//css打包成文件
module.exports = {
    devtool: 'eval-source-map',// 生成文件对应关系
    // 单入口配置
    // ent// 单入口配置ry: './src/index.js',
    // output:{
    //     publicPath : '/dist',//热更新必须加上这个配置项
    //     filename : 'main.js',
    //     path: path.resolve(__dirname, 'dist')
    // },
    // 单入口配置 结束
    // 多页面开发配置
    entry:{
        index: './src/js/index.js',
        login:'./src/js/login.js'
    },
    output:{
        filename:'js/[name].js',
        path:path.resolve('dist')
        // publicPath: '/dist/'
    },
    // 多页面开发配置结束
    module:{
      rules:[
          {
              test: /\.css$/,     // 解析css
              //use: ['style-loader', 'css-loader'] // 从右向左解析
              //也可以这样写，这种方式方便写一些配置参数
              use: [
                  {loader: 'style-loader'},
                  {
                      loader: MiniCssExtractPlugin.loader,
                      options:{publicPath: '../'}
                  },
                  {loader: 'css-loader'},
                  {loader: 'postcss-loader'}
              ]


          },
          {
              test: /\.(htm|html)$/,
              use: 'html-withimg-loader'
          },
          {
              test: /\.less$/,
              use: [

                  {
                  loader: "style-loader"
              },{
                  loader: MiniCssExtractPlugin.loader,
                  options:{publicPath: '../'}
              },{
                  loader: "css-loader"
              }, {loader: 'postcss-loader'}, {
                  loader: "less-loader"
              }]
          },
          {
              test: /\.(jpe?g|png|gif|ico)$/,
              loader: 'url-loader?limit=8192&name=img/[hash:8].[name].[ext]' //配置打包后的名字
              // use: [
              //     {
              //         loader: 'url-loader',
              //         options: {
              //             limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
              //             outputPath: 'img/',   // 图片打包后存放的目录
              //             name: [hash:8].[name].[ext]
              //         }
              //     }
              // ]
          },
          {
              test: /\.(eot|ttf|woff|svg)$/, //引入字体图标 svg图片
              use: 'file-loader?name=img/[hash:8].[name].[ext]'
          }
      ]
    },
    devServer:{// 本地服务配置
        //设置基本目录结构
        contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        port:'8080',
        inline: true,
        open:true,//自动拉起浏览器
        hot:true,//热加载
        //hotOnly:true,//只有热更新，禁用自动刷新功能
    },
    plugins:[
        //调用webpack的热更新插件
        new Webpack.HotModuleReplacementPlugin(),
        // 单页面模板配置
        // new HtmlWebpackPlugin({
        //     // 在src目录下创建一个index.html页面当做模板来用
        //     template: './src/index.html',
        //     hash: true,//会在打包好的bundle.js后面加上hash串
        // }),
        // 单页面模板配置 结束
        // 多页面模板配置
        new HtmlWebpackPlugin({
            //template: 'html-withimg-loader!./src/index.html',
            template: './src/index.html',
            filename: 'index.html',
            hash: true,
            chunks:['index'] // 对应关系，index.js 对应的是 index.html
        }),
        new HtmlWebpackPlugin({
            template: './src/login.html',
            filename: 'login.html',
            hash: true,
            chunks:['login'] // 对应关系，login.js 对应的是 login.html
        }),
        // 多页面模板配置结束
        new CleanWebpackPlugin(),
        // css打包成文件
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        })
    ]
}