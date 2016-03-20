'use strict';

const parse = require('co-body');
const Todo = require('./models').Todo;
const router = require('koa-router')();


function* list() {
    this.body = yield Todo.find({}).exec();
}

function* add() {
    const body = yield parse(this);
    this.body = yield Todo.create({
        text: body.text
    });
}

function* del() {
    const id = this.params.id;
    if (!id) {
        throw new Error('Не задан параметр id: ' + id);
    }
    this.body = yield Todo.remove({_id: id});
}

function* completed() {
    const body = yield parse(this);
    const id = this.params.id;
    const completed = body.completed;

    if (!id) {
        throw new Error('Не задан параметр id: ' + id);
    }

    this.body = yield  Todo.update({_id: id}, {completed: completed}).then(function() {
        return Todo.findOne({_id: id});
    });
}

router
    .get('/', function*() {
        this.render('todos/index.html');
    })
    .get('/todos', list)
    .post('/todos', add)
    .del('/todos/:id', del)
    .put('/todos/:id/completed', completed);

module.exports = router;
