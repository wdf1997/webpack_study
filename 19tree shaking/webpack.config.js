const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { resolve } = require('path')

/**
 * tree shaking：去除无用代码
 *      前提：1、必须使用ES6模块化 2、开启production环境
 *      作用： 减少代码体积
 * 
 *      在package.json中配置
 *          "sideEffects": false 所有代码都没有副作用 （都可以进行tree shaking）
 *              问题：可能会把css / @babel/polyfill (副作用) 文件干掉
 *          "sideEffects": ["*.css", "*.less"]
 */         

// 设置nodejs环境变量：来决定使用browserslist的哪个环境，下面这样子设置之后就是开发环境了
// process.env.NODE_ENV = 'development'

// 复用loader
const commonCssLoader = [
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath: '../'
        }
    },
    'css-loader',
    {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                ident: 'postcss',
                plugins: [require('postcss-preset-env')()]
            }
        }
    }
]
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'built.[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            /**
            * 正常来讲，一个文件只能被一个loader处理。
            * 当一个文件要被多个loader处理，那么我们一定要指定loader执行的先后顺序：
            * 先执行eslint再执行babel
            */
            {
                // 在package.json中eslintConfig --> airbnb
                test: /\.js$/,
                // 一定要排除node_modules
                exclude: /node_modules/,
                // 优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    // 自动修复
                    fix: true
                }
            },
            {
                // 以下loader只会匹配一个
                // 注意： 不能有两个配置处理同一种类型的文件,所以我们将相同类型的提取出去
                // 就像eslint-loader和babel-loader都是处理js文件的，如果都放在oneOf里面，那么她=它只会匹配一个，所以我们将eslint-loader提到外面去。
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [...commonCssLoader]
                    },
                    {
                        test: /\.less$/,
                        use: [
                            ...commonCssLoader,
                            'less-loader'
                        ]
                    },
                    {
                        // js兼容性处理
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        // 按需加载
                                        useBuiltIns: 'usage',
                                        corejs: {
                                            version: 3
                                        },
                                        targets: {
                                            chrome: '60',
                                            firefox: '50'
                                        }
                                    }
                                ]
                            ],
                            // 开启babel缓存
                            // 第二次构建时，才会读取之前的缓存，从而使速度更快一些
                            cacheDirectory: true
                        }
                    },
                    {
                        // 处理图片
                        test: /\.(png|jpg|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: '[hash:10].[ext]',
                            outputPath: 'images'
                        }
                    },
                    {
                        // 处理html中的图片
                        test: /\.html$/,
                        loader: 'html-loader'
                    },
                    {
                        exclude: /\.(css|js|less|html|jpg|png|gif)$/,
                        loader: 'file-loader',
                        options: {
                            outputPath: 'media'
                        }
                    }
                ]
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
            filename: 'css/main.[contenthash:10].css'
        }),
        // 压缩css
        new OptimizeCssAssetsWebpackPlugin()
    ],
    // 生产环境下会自动压缩js代码, 所以只需要把mode改为production模式就会自动压缩js代码了。
    mode: 'production'
}