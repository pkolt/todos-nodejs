const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('express-nunjucks');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const todos = require('./todos');
const app = express();

// Флаг режима разработки. По-умолчанию всегда запускается в режиме разработки.
const isDebug = app.get('env') === 'development';

const mongodbURI = 'mongodb://localhost/todos';
mongoose.connect(mongodbURI);

// Убирает "X-Powered-By: Express" из заголовка ответа.
app.disable('x-powered-by');

// Подключаем статику (только в режиме разработки).
if (isDebug) {
    app.use('/static', express.static(__dirname + '/static'));
    app.use('/static/todos', express.static(__dirname + '/todos/static'));
}

// Расширение файлов шаблонов используемое по умолчанию.
app.set('view engine', 'html');

// Каталог с шаблонами.
app.set('views', __dirname + '/templates');

// Конфигурация движка шаблонов.
nunjucks.setup({
    autoescape: true,
    watch: true
}, app);

app.use(helmet());

const logStream = fs.createWriteStream(__dirname + '/logs/errors.log', {flags: 'a'});

// Подключаем логгирование.
app.use(morgan('combined', {
    skip: (req, res) => res.statusCode < 400,
    stream: logStream
}));

// Обработка тела POST-запроса (req.body)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Подключение приложений.
app.use('/', todos);

// Ошибка сервера.
app.use(function (err, req, res, next) {
    if (err) {
        // Отправляет информацию об ошибке в stderr.
        console.error(err.stack);
        // Записывает информацию об ошибке в лог.
        logStream.write(err.stack);

        var data = {
            message: err.message,
            stack: isDebug ? err.stack : null
        };

        if (req.xhr) {
            res.status(500).json(data);
        } else {
            res.status(500).render('500', data);
        }
    } else {
        next(err);
    }
});

// Страница не найдена.
app.use(function(req, res) {
    res.status(404).render('404');
});

module.exports = app;
