'use strict';

const fs = require('fs');
const nunjucks = require('nunjucks');
const mongoose = require('mongoose');
const koa = require('koa');
const mount = require('koa-mount');
const serve = require('koa-static');
const minify = require('html-minifier').minify;
const todos = require('./todos');
const app = koa();

// Флаг режима разработки. По-умолчанию всегда запускается в режиме разработки.
const isDebug = app.env === 'development';

const mongodbURI = 'mongodb://localhost/todos';
mongoose.connect(mongodbURI);

const render = (ctx) => (name, data) => {
    const paths = [
        __dirname + '/templates',
        __dirname + '/todos/templates'
    ];
    const loader = new nunjucks.FileSystemLoader(paths);
    const env = new nunjucks.Environment(loader);

    ctx.type = 'html';
    ctx.body = env.render(name, data);
};

const logStream = fs.createWriteStream(__dirname + '/logs/errors.log', {flags: 'a'});

app.on('error', function(err, ctx) {
    // Отправляет информацию об ошибке в stderr.
    console.error(err.stack);
    // Записывает информацию об ошибке в лог.
    logStream.write([ctx.method, ctx.path, err.message, err.stack].join('\n'));
});

// Прокидываем функцию render() с нужным контекстом.
app.use(function *(next) {
    this.render = render(this);
    yield next;
});

// Минификация html.
app.use(function *(next){
    yield next;

    if (!this.response.is('html')) return;

    var body = this.body;
    if (!body || body.pipe) return;

    if (Buffer.isBuffer(body)) {
        body = body.toString();
    }
    this.body = minify(body, {
        collapseWhitespace: true
    });
});

// Обработка 404 ошибки.
app.use(function *(next) {
    yield next;

    if (this.status !== 404) return;
    
    const message = 'Page Not Found';
    switch (this.accepts('html', 'json')) {
        case 'html':
            this.render('404.html');
            break;
        case 'json':
            this.body = {
                message: message
            };
            break;
        default:
            this.type = 'text';
            this.body = message;
    }
});

// Подключаем статику (только в режиме разработки).
if (isDebug) {
    app.use(mount('/static', serve(__dirname + '/static')));
    app.use(mount('/static/todos', serve(__dirname + '/todos/static')));
}

app.use(mount('/', todos));

if (!module.parent) {
    var server = app.listen(8000, function() {
        const host = server.address().address;
        const port = server.address().port;
        console.log('Start web server http://%s:%s', host, port)
    });
}

module.exports = app;
