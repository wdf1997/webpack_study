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
                use: [
                    // 创建style标签，将样式放入
                    // 'style-loader',
                    // 这个loader取代了style-loader。作用：提取js中的css成单独文件。然后我们就可以在build下看到一个main.css文件，然后在index.html中看见引入了 <link href="main.css" rel="stylesheet">
                    MiniCssExtractPlugin.loader,
                    // 将css文件整合到js文件中
                    'css-loader',
                    /**
                     * css兼容性处理： postcss => postcss-loader, postcss-preset-env
                     * 帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
                     * "browserslist": {
                     * // 这个跟我们下面的mode是没有关系的
                     *      // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = 'development'
                            "development": [
                            "last 1 chrome version",
                            "last 1 firefox version",
                            "last 1 safari version"
                            ],
                            // 生产环境，默认是看生产环境的。
                            "production": [
                            ">0.2%",
                            "not dead",
                            "not op_mini all"
                            ]
                        }
                     */
                    // 使用loader的默认配置
                    // 'postcss-loader',
                    // 修改loader的配置
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                // 默认配置
                                ident: 'postcss',
                                // postcss的插件
                                plugins: [require('postcss-preset-env')()]
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            // 对输出的css文件进行重命名
            filename: 'css/main.css'
        }),
        // 压缩css
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: 'development'
}