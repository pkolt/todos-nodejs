'use strict';

const fs = require('fs');
const express = require('express');
const nunjucks = require('nunjucks');
const nunjucksAsyncLoader = require('nunjucks-async-loader');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todosRouter = require('./todos/router');

const app = express();

// Флаг режима разработки. По-умолчанию всегда запускается в режиме разработки 'development'.
const isDev = app.get('env');

const mongodbURI = 'mongodb://localhost/todos';
mongoose.connect(mongodbURI);


const logStream = fs.createWriteStream(__dirname + '/logs/errors.log', {flags: 'a'});

// Убрать "X-Powered-By: Express" из заголовка.
app.set('x-powered-by', false);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());


// Подключение шаблонизатора.
(function() {
    const paths = [
        __dirname + '/templates',
        __dirname + '/todos/templates'
    ];

    const loader = new nunjucksAsyncLoader(paths, {
        // Перезагружать шаблоны при изменении.
        watch: isDev,
        // Не использовать кеш, перекомпилировать шаблоны каждый раз.
        noCache: isDev
    });

    const env = new nunjucks.Environment(loader);

    env.express(app);
})();


function handler500(err, req, res, next) {
    if (!err) {
        return next();
    }

    logStream.write([req.method, req.path, err.message, err.stack].join('\n'));

    if (req.xhr) {
        res.status(500).send({error: err.message});
    } else {
        res.status(500).render('500.html');
    }
}

function handler404(req, res) {
    if (req.xhr) {
        res.status(404).send({message: 'Page Not Found'});
    } else {
        res.status(404).render('404.html');
    }
}

// Подключаем статику (только в режиме разработки).
if (isDev) {
    app.use('/static', express.static(__dirname + '/static'));
    app.use('/static/todos', express.static(__dirname + '/todos/static'));
}

app.use('/', todosRouter);

app.use(handler500);
app.use(handler404);

if (!module.parent) {
    var server = app.listen(8000, function() {
        const host = server.address().address;
        const port = server.address().port;
        console.log('Start web server http://%s:%s', host, port)
    });
}

module.exports = app;
