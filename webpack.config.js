const HtmlWebpackPlugin = require('html-webpack-plugin')
const VisualizerPlugin = require('webpack-visualizer-plugin')

const webpack = require('webpack')
const path = require('path')

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        // Define entry points for all resource to get hot reloading.
        app: [
            './src/js/app.js',
            './src/styles/app.sass',
            './src/index.pug'
        ],
        // Chunked JS files
        anotherPage: './src/js/anotherPage.js',
        landingPage: './src/js/landingPage.js'
    },
    output: {
        // Output rules
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
                        loader: 'image-webpack-loader'
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        hot: true,
        inline: true,
        port: 3000,
        stats: 'errors-only'
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new VisualizerPlugin({
            filename: '../bundleVisualizer.html'
        })
    ]
}
