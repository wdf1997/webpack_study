
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build'),
        publicPath: '/build/'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                // 要用多个loader处理的时候用use, 当只使用一个loader时，可以用loader: 'xx'
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                // 问题：默认处理不了html中的img图片
                // 处理图片资源
                test: /\.(jpg|png|gif)$/,
                // 使用一个loader
                // 下载url-loader file-loader,因为url-loader依赖于file-loader
                loader: 'url-loader',
                options: {
                    // 当图片大小小于8kb，就会被base64处理 （base64在客户端本地解码所以会减少服务器压力，如果图片过大还继续采用base64编码会导致cpu调用率上升，网页加载时变卡）
                    // 优点：减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会更大（文件请求速度更慢）
                    limit: 8 * 1024
                }
            },
            {
                test: /\.html$/,
                // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 复制./src/index.html文件，并自动引入打包输出的所有资源（JS/CSS）（这时打包的时候，我们可以看到在build/index.html中引入了<script src="built.js"></script>）
            template: './src/index.html'
        })
    ],
    mode: 'development'
}