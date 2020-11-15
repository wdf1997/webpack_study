/**
 * HMR: hot module replacement 热模块替换 / 模块热替换
 *  作用: 一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
 *    极大的提升了构建速度
 * 
 *    样式文件： 可以使用HMR功能：因为style-loader内部实现了
 *    js文件：默认不能使用HMR功能  --> 需要修改js代码，添加支持HMR功能的代码
 *         注意： HMR功能对js的处理，只能处理非入口js文件的其他文件
 *    html文件：默认不能使用HMR功能，同时会导致一个问题：html文件不能热更新了~ （因为html文件只有当前这一个，而js文件可能会有多个，所以html文件不用做HMR功能，）
 *      解决：修改entry入口，将html文件引入，但是还是不能使用HMR功能
 */
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['./src/js/index.js', './src/index.html'],
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
    // publicPath: '/build/'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          // 图片的输出路径
          outputPath: 'images'
        }
      },
      {
        // 处理html中img资源
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        exclude: /\.(html|css|js|less|jpg|png|gif)$/,
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
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true,
    // 开启HMR功能
    // 当修改了webpack配置，新配置要想生效，必须重启webpack服务
    hot: true
  },
  mode: 'development'
}