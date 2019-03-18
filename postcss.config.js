// 必须设置浏览器类型才会自动添加前缀
module.exports = {
    plugins:[
        require('autoprefixer')({
            "browsers": [
                "defaults",
                "not ie < 11",
                "last 2 versions",
                "> 1%",
                "iOS 7",
                "last 3 iOS versions"
            ]
        })
    ]
}