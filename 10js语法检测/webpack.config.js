const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
            },
            /**
             * 语法检查：eslint-loader eslint
             * 注意： 只检查自己写的源代码，第三方的库是不用检查的
             * 设置检查规则：
             *  在package.json中的eslintConfig中设置（当然也可以单独写一个.eslintrc文件）：推荐使用airbnb -> eslint eslint-config-airbnb-base eslint-plugin-import
             *      "eslintConfig": {
                        "extends": "airbnb-base"
                    }
             */
            {
                test: /\.js$/,
                // 一定要排除node_modules
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // 自动修复eslint的错误
                    fix: true
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