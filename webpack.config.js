const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');
const path = require('path');
const glob = require('glob');


const isProd = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    use: ['css-loader', 'sass-loader'],
    fallback: 'style-loader'
})
const cssConfig = isProd ? cssProd : cssDev;


module.exports = {
    entry: {
        app: [
            './src/js/app.js',
            './src/styles/app.sass'
        ],
        portfolio: './src/js/portfolio.js',
        landingPage: './src/js/landingPage.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
             {
                test: /\.sass$/,
                use: cssConfig
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            // {
            //     test: /\.(png|svg|jpg?g|gif)$/,
            //     use: [
            //         'file-loader?name=[hash:10].[ext]&publicPath=images/&outputPath=images/',
            //         'image-webpack-loader'
            //     ]
            // }
            {
                test: /\.(png|svg|jpg?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            publicPath: 'images/'
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
        port: 3000,
        stats: 'errors-only',
        open: true
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'src/assets', to: 'assets'}
        ]),
        new HtmlWebpackPlugin({
            title: 'Landing Page',
            hash: true,
            excludeChunks: ['portfolio'],
            chunksSortMode: (c1, c2) => {
                let orders = ['app', 'landingPage']
                let o1 = orders.indexOf(c1.names[0])
                let o2 = orders.indexOf(c2.names[0])
                return o1 - o2
            },
            template: './src/index.html'
        }),
        new HtmlWebpackPlugin({
            title: 'Portfolio Item Page',
            hash: true,
            excludeChunks: ['landingPage'],
            chunksSortMode: (c1, c2) => {
                let orders = ['app', 'portfolio']
                let o1 = orders.indexOf(c1.names[0])
                let o2 = orders.indexOf(c2.names[0])
                return o1 - o2
            },
            filename: 'portfolio/portfolio-item.html',
            template: './src/templates/portfolio-item.html'
        }),

        new ExtractTextPlugin({
            filename: 'css/[name].bundle.css',
            disable: !isProd,
            allChunks: true
        }),

        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}
