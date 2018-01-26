const fs = require('fs');
const path = require('path');
const express = require('express');
const server = express();

const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');
const template = fs.readFileSync(
    path.resolve(__dirname, './index.template.html'),
    'utf-8');

const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false, // 推荐
    template,
    clientManifest
});

server.use(express.static(path.join(__dirname, '../dist')));

// 在服务器处理函数中……
server.get('/item', (req, res) => {

    const context = { url: req.url }

    renderer.renderToString(context, (err, html) => {
        if (err) {
            console.log('err', err);
        }
        console.log('html -> ', html);
        res.send(html);
    })

});

server.get('/prerender', (req, res) => {

    const context = { url: req.url }

    renderer.renderToString(context, (err, html) => {
        if (err) {
            console.log('err', err);
        }
        console.log('html -> ', html);
        res.send(html);
    })

});

process.on('unhandledRejection', (reason, p) => {
    console.log("Unhandled Rejection at: Promise ", p, " reason: ", reason);
    // application specific logging, throwing an error, or other logic here
});

server.listen(8080, () => void console.log('ready'));