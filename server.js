var app = require('./app');

// Запуск сервера
var server = app.listen(8000, function() {
    var host = server.address().address,
        port = server.address().port;
    console.log('Start web server http://%s:%s', host, port)
});
