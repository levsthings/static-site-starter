const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: {
        app: [
            './src/js/app.js',
            './src/styles/app.sass',
            './src/index.pug'
        ],
        anotherPage: './src/js/anotherPage.js',
        landingPage: './src/js/landingPage.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'html-loader'
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            data: {
                                title: 'Test123'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    require('autoprefixer')({
                                        browsers: ['last 2 versions']
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            progressive: true,
                            optipng: {
                                optimizationLevel: 7,
                                interlaced: false
                            },
                            mozjpeg: {
                                quality: 659
                            },
                            gifsicle: {
                                optimizationLevel: 7,
                                interlaced: false
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/assets', to: 'assets' }
        ]),
        new HtmlWebpackPlugin({
            title: 'Landing Page',
            hash: true,
            excludeChunks: ['anotherPage'],
            chunksSortMode: (c1, c2) => {
                let orders = ['app', 'landingPage']
                let o1 = orders.indexOf(c1.names[0])
                let o2 = orders.indexOf(c2.names[0])
                return o1 - o2
            },
            filename: 'index.html',
            template: './src/index.pug'
        }),
        new HtmlWebpackPlugin({
            title: 'Another Page',
            hash: true,
            excludeChunks: ['landingPage'],
            chunksSortMode: (c1, c2) => {
                let orders = ['app', 'anotherPage']
                let o1 = orders.indexOf(c1.names[0])
                let o2 = orders.indexOf(c2.names[0])
                return o1 - o2
            },
            filename: 'another-page/another-page.html',
            template: './src/templates/another-page.pug'
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].bundle.css',
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new UglifyJSPlugin()
    ]
}
