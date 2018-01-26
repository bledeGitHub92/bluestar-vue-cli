const fs = require('fs');
const path = require('path');
const Vue = require('vue');
const server = require('express')();
const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync(
        path.resolve(__dirname, './index.template.html'),
        'utf-8'
    )
});

server.get('*', (req, res, next) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: '<div>访问的URL是：{{url}}</div>'
    });
    renderer.renderToString(app, (err, html) => {
        if (err) next(err);
        res.send(html)
    });
}).listen(8080);