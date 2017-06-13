const HtmlWebpackPlugin = require('html-webpack-plugin')
const VisualizerPlugin = require('webpack-visualizer-plugin')

const webpack = require('webpack')
const path = require('path')

module.exports = {

    devtool: 'cheap-module-source-map',
    entry: {
        app: [
            './src/js/app.js',
            './src/styles/app.sass'
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
                test: /\.ejs$/,
                loader: 'html-loader'
            },
            {
                test: /\.sass$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
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
                                optimizationLevel: 7
                            },
                            mozjpeg: {
                                quality: 659
                            },
                            gifsicle: {
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
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        hot: true,
        inline: true,
        port: 3000,
        stats: 'errors-only',
        open: true
    },
    plugins: [
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
            template: './src/index.ejs',
            inject: true
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
            template: './src/templates/another-page.ejs'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new VisualizerPlugin({
            filename: '../bundleVisualizer.html'
        })
    ]
}
