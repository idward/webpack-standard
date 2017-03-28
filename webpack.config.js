var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ETWP = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var isProduction = process.env.NODE_ENV === 'production';
//prefix css and minimize in production mode
var processCss = isProduction ? '?minimize!postcss-loader' : '';

console.log('是否生产环境:' + isProduction);

var config = {
    devtool: 'source-map', //Error code hints
    context: path.join(__dirname, 'src/app'),
    //define entry point
    entry: {
        'index': [path.join(__dirname, 'node_modules/webpack/hot/dev-server')],
        'home': './home.js',
        'about': './about.js',
        'vendor': ['moment','jquery']
    },

    //define output point
    output: {
        path: path.join(__dirname, 'dist'),
        filename: isProduction ? '[name].[chunkhash].bundle.js' : '[name].bundle.js'
    },

    //loader
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'jshint-loader',
                exclude: /node_modules/,
                options: {
                    esversion: 6,
                    emitErrors: true,
                    failOnHint: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_module/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(css|scss)$/,
                include: path.join(__dirname, 'src/css'),
                loader: ETWP.extract({
                    fallback: 'style-loader',
                    use: `css-loader${processCss}!sass-loader`
                })
            },
            {
                test: /\.(png|jpg)$/,
                include: path.join(__dirname, 'src/assets'),
                loader: 'file-loader'
            }
        ]
    },

    //resolve
    resolve: {
        alias: {
            styles: path.join(__dirname, 'src/css'),
            images: path.join(__dirname, 'src/assets'),
        }
    },

    //devServer
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        inline: true,
        open: true,  //编译完成后打开浏览器
        hot: true,
        stats: 'errors-only'  //出错时输出信息
    },

//plugins
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            inject: 'body',
            // hash: true,
            filename: 'index.html',
            excludeChunks: ['about', 'index']
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            inject: 'body',
            // hash: true,
            filename: 'about.html',
            excludeChunks: ['home', 'index']
        }),
        // new webpack.HotModuleReplacementPlugin(),
        //extract common chunk
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
            // chunks: ['home', 'about']
        }),
        //extract internal css to external css file
        new ETWP({
            filename: '[name].[contenthash].css',
            allChunks: true,
            disable: !isProduction
        }),
        //clean the dist or build directory
        new CleanWebpackPlugin(['dist', 'build'])
    ]
}

if (isProduction) {
    //minimize javascript file
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        comments: false
    }));
} else {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;