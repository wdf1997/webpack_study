
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.export = {
    enter: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // exclude: /node_modules/,
                // use: ['style-loader', 'css-loader']
                loader: 'style-loader!css-loader'
            },
            // 打包其他资源（除了html/js/css以外的资源）
            {
                // 排除html/js/css资源
                exclude: /\.(css|js|html|less)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}