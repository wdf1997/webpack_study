/**
 * loader: 1.下载 2.使用（配置loader）
 * plugins: 1.下载 2.引入 3.使用
 */

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // loader的配置
        ]
    },
    plugins: [
        // plugins的配置
        // html-webpack-plugin  因为它是个类或构造函数，所以new一下
        // 功能：默认会创建一个空的HTML文件，自动引入打包输出的所有资源（JS/CSS）
        // 需求：需要右结构的HTML文件
        new HtmlWebpackPlugin({
            // 复制./src/index.html文件，并自动引入打包输出的所有资源（JS/CSS）（这时打包的时候，我们可以看到在build/index.html中引入了<script src="built.js"></script>）
            template: './src/index.html'
        })
    ],
    mode: 'development'
}