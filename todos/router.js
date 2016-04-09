'use strict';

const parse = require('co-body');
const Todo = require('./models').Todo;
const router = require('koa-router')();


function* index() {
    this.render('todos/index.html');
}

function* list() {
    this.body = yield Todo.find({}).exec();
}

function* add() {
    const body = yield parse(this);
    try {
        this.body = yield Todo.create({text: body.text});
    } catch (err) {
        this.status = 400;
        this.body = {message: err.message};
        this.app.emit('error', err, this);
    }
}

function* del() {
    const id = this.params.id;
    try {
        this.body = yield Todo.remove({_id: id});
    } catch (err) {
        this.status = 400;
        this.body = {message: err.message};
        this.app.emit('error', err, this);
    }
}

function* completed() {
    const body = yield parse(this);
    const id = this.params.id;
    const completed = body.completed;
    
    try {
        yield Todo.update({_id: id}, {completed: completed});
        this.body = {};
    } catch (err) {
        this.status = 400;
        this.body = {message: err.message};
        this.app.emit('error', err, this);
    }
}

router
    .get('/', index)
    .get('/todos', list)
    .post('/todos', add)
    .del('/todos/:id', del)
    .put('/todos/:id/completed', completed);

module.exports = router;
