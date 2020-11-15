const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { resolve } = require('path')

// 设置nodejs环境变量, 这样子设置之后就是开发环境了
// process.env.NODE_ENV = 'development'

// optimize-css-assets-webpack-plugin

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
       rules: [
           {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
           }
       ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // 压缩html只需在这里加上minify的配置，然后我们去index.html文件里就能看见代码变成被压缩的一行
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            // 对输出的css文件进行重命名
            filename: 'css/main.css'
        }),
        // 压缩css
        new OptimizeCssAssetsWebpackPlugin()
    ],
    // 生产环境下会自动压缩js代码, 所以只需要把mode改为production模式就会自动压缩js代码了。
    mode: 'development'
}