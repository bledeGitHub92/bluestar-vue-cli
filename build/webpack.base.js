const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const config = require('../config/index');

const extractCss = new ExtractPlugin({ filename: 'styles/[name].static.[contenthash:8].css', disable: isDev });
const extractLess = new ExtractPlugin({ filename: 'styles/[name].static.[contenthash:8].css', disable: isDev });
const extractLessOfVue = new ExtractPlugin({ filename: 'styles/[name].vue.[contenthash:8].css', disable: isDev });
const extractCssOfVue = new ExtractPlugin({ filename: 'styles/[name].vendor.[contenthash:8].css', disable: isDev });

// base.plugin
const basePlugin = [
    extractCss, extractLess,
    extractCssOfVue, extractLessOfVue
];
const prodPlugin = [
    new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
]
const devPlugin = [
    // new FriendlyErrorsPlugin()
];

// 是否压缩 css
const cssLoader = setMinimize('css-loader');

module.exports = {
    devtool: isProd ? false : '#cheap-module-source-map',
    output: {
        filename: '[name].[chunkhash:8].js',    // 输出文件名
        path: config.build.assetsRoot,    // 输出路径，须使用绝对路径
        publicPath: isProd ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        chunkFilename: 'scripts/[name].[chunkhash:8].js',
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '../src'),
            '@assets': path.resolve(__dirname, '../src/assets/'),
            '@components': path.join(__dirname, '../src/components'),
            'lib': path.resolve(__dirname, '../src/app/lib')
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },
        {
            test: /\.css$/,
            use: extractCss.extract({
                use: [cssLoader],
                fallback: 'vue-style-loader',
            })
        }, {
            test: /\.less$/,
            use: extractLess.extract({
                use: [cssLoader, 'postcss-loader', 'less-loader'],
                fallback: 'vue-style-loader'
            })
        }, {
            test: /\.vue$/,
            include: path.resolve(__dirname, '../src'),
            loader: 'vue-loader',
            options: {
                loaders: {
                    less: extractLessOfVue.extract({
                        use: [cssLoader, 'postcss-loader', 'less-loader'],
                        fallback: 'vue-style-loader'
                    }),
                    css: extractCssOfVue.extract({
                        use: [cssLoader],
                        fallback: 'vue-style-loader'
                    })
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
    plugins: isProd ? basePlugin.concat(prodPlugin) : basePlugin.concat(devPlugin)
};

function setMinimize(name) {
    const loader = { loader: name };
    const options = { minimize: true };
    return isProd ? { ...loader, options } : loader;
}