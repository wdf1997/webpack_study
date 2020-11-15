/*
    首先要npm i webpack webpack-cli --save-dev 安装webpack

    webpack.config.js: webpack的配置文件
    作用：指示webpack干哪些活（当你运行webpack指令时，会加载里面的配置）

    所有构建工具都是基于nodejs平台运行的，模块化默认采用commonjs
    src是我们项目的源代码，用的是es6模块化；webpack是我们配置的代码，用的是commonjs模块化
*/

// resolve 是用来拼接绝对路径的方法
const { resolve } = require('path')

// commonjs 通过module.exports去暴露一个对象，在对象里面写webpack配置
module.exports = {
    // webpack配置
    // 入口起点
    entry: './src/index.js',
    // 输出
    output: {
        // 输出文件名
        filename: 'built.js',
        // 输出路径
        // __dirname是nodejs的变量，代表当前文件的目录的绝对路径
        path: resolve(__dirname, 'build')
    },
    // loader的配置
    module: {
        rules: [
            // 详细的loader配置
            // 不同文件必须配置不同loader处理
            {
                // 匹配哪些文件
                test: /\.css$/,
                // 使用哪些loader进行处理
                use: [
                    // use数组中loader执行顺序：从右到左，从下到上，依次执行
                    // 创建style标签，将js中的样式资源插入进去，添加到header中生效
                    'style-loader',
                    // 将css文件变成一个commonjs模块加载到js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less/,
                use: [
                    // 这个顺序是固定的，1.先将less文件编译成css文件，2.然后将css文件变成一个commonjs模块加载到js中，3.创建style标签，将js中的样式资源插入进去，添加到header中生效
                    'style-loader',
                    'css-loader',
                    // 将less文件编译成css文件
                    // 需要下载less和less-loader
                    'less-loader'
                ]
            }
        ]
    },
    // plugins的配置
    plugins: [

    ],
    // 模式
    mode: 'development'  // 开发模式
    // 或mode: 'production', 两种模式不能同时存在
}