const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractPlugin({ filename: 'styles/[name].static.[contenthash:8].css', allChunks: true });
const extractLESSofVue = new ExtractPlugin({ filename: 'styles/[name].app.[contenthash:8].css', allChunks: true });

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: isProd ? false : '#cheap-module-source-map',
    output: {
        filename: '[name].[chunkhash:8].js',    // 输出文件名
        path: path.resolve(__dirname, '../dist'),    // 输出路径，须使用绝对路径
        publicPath: '/',
        chunkFilename: 'scripts/[name].[chunkhash:8].js',
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'lib': path.resolve(__dirname, '../src/app/lib')
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.css$/,
            use: isProd
                ? extractCSS.extract({
                    use: [{ loader: 'css-loader', options: { minimize: true } }],
                    fallback: 'vue-style-loader',
                })
                : ['vue-style-loader', 'css-loader']
        }, {
            test: /\.vue$/,
            include: path.resolve(__dirname, '../src'),
            loader: 'vue-loader',
            options: {
                loaders: {
                    less: isProd
                        ? extractLESSofVue.extract({
                            use: [{ loader: 'css-loader', options: { minimize: true } }, 'postcss-loader', 'less-loader'],
                            fallback: 'vue-style-loader'
                        })
                        : ['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']
                }
            },
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'img/[name].[hash:7].[ext]'
            }
        },
        {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'media/[name].[hash:7].[ext]'
            }
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'fonts/[name].[hash:7].[ext]'
            }
        }]
    },
    plugins: isProd
        ? [
            extractCSS, extractLESSofVue,
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
        ]
        : [
            new FriendlyErrorsPlugin()
        ]
};