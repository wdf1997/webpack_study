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
  mode: 'development',
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
  devtool: 'eval-source-map'
  /**
   * source-map: 一种提供源代码到构建后代码映射的技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）
   *    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
   * 
   *    source-map: 外部
   *        会提示：错误代码准确信息 和 源代码的错误位置
   * 
   *    inline-source-map: 内联 -->  只生成一个内联的source-map （就是在built.js文件中，我们可以看到在文件的最后会有一大串的内容: sourceMappingURL=....）
   *        会提示：错误代码准确信息 和 源代码的错误位置
   * 
   *    hidden-source-map：外部 （就是我们可以看见生成了一个built.js.map文件）
   *        会提示：错误代码错误原因，但是没有错误位置，不能追踪到源代码错误， 只能提示到构建后代码的错误位置   (只隐藏源代码，会提示构建后代码的错误信息)
   * 
   *    eval-source-map：内联 -->  每一个文件都生成source-map, 都在eval中 (就是在build.js文件中，我们可以看到在文件的有很多行eval(....), 里面包含了sourceMappingURL=....)
   *        会提示：错误代码准确信息 和 源代码的错误位置，只是在提示在哪个文件的后面多了hash值而已
   * 
   *    nosources-source-map: 外部
   *        会提示：错误代码准确信息， 但是没有任何源代码信息 (全部隐藏)
   * 
   *    cheap-source-map：外部
   *        会提示：错误代码准确信息 和 源代码的错误位置。但是它只能精确到行，而其他的是精确到列的
   * 
   *    cheap-module-source-map：外部
   *        会提示：错误代码准确信息 和 源代码的错误位置
   *        module会将loader的source map加入
   * 
   * 
   * 
   *    内联和外联的区别： 1、外部生成了文件，内联没有 2、内联构建速度更快
   * 
   * 
   * 
   *    开发环境： 速度快，调试更友好
   *        速度快（eval > inline > cheap > ...）
    *           最快：eval-cheap-source-map
    *           其次：eval-source-map
    *       调试更友好
    *           source-map
    *           cheap-module-source-map
    *           cheap-source-map
    *       最终得出结论这两种最适合： eval-source-map（调试更友好一些） / eval-cheap-module-source-map （性能更好一点）
    * 
   *    生产环境： 源代码要不要隐藏？调试要不要更友好
   *        内联会让代码体积变大，所以在生产环境不用内联
   *        nosources-source-map （全部隐藏）
   *        hidden-source-map (只隐藏源代码，会提示构建后代码的错误信息)
   * 
   *        最终得出结论这两种最适合： source-map / cheap-module-source-map  （当然了如果要隐藏代码，可以选择上面两种）
   */
}