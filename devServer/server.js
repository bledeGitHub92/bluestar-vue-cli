const app = require('express')();
const http = require('http').Server(app);
const webpack = require('webpack');
const config = require('../build/webpack.dev.js');    // webpack 开发环境配置
const compiler = webpack(config);


// redirect
app.use(require('connect-history-api-fallback')({
    index: '/app.html',
    rewrites: [
        // { from: '', to: '' }
    ]
}));

// hot-reload
app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true
}));
app.use(require("webpack-hot-middleware")(compiler));

http.listen(8888, () => void console.log('jifeng2 listenning on port 8888!\n'));