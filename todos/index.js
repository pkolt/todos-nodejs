'use strict';

const express = require('express');
const nunjucks = require('express-nunjucks');
const Todo = require('./models').Todo;
const app = express();

app.set('views', __dirname + '/templates');

nunjucks.register(app);

app.get('/', function(req, res) {
    res.render('todos/index');
});

app.get('/todos', function(req, res, next) {
    Todo.find({}).exec().then(function(data) {
        res.json(data);
    }, next);
});

app.route('/todo')
    .post(function(req, res, next) {
        Todo.create({
            text: req.body.text
        }).then(function(todo) {
            res.json(todo);
        }, next);
    })

    .put(function(req, res, next) {
        const id = req.body.id;
        const completed = req.body.completed;
        
        if (!id) {
            throw new Error('Не задан параметр id: ' + id);
        }
        Todo.update({_id: id}, {completed: completed}).then(function() {
            return Todo.findOne({_id: id});
        }).then(function(todo) {
            res.json(todo);
        }, next);
    })

    .delete(function(req, res, next) {
        var id = req.body.id;
        if (!id) {
            throw new Error('Не задан параметр id: ' + id);
        }
        Todo.remove({_id: id}).then(function(todo) {
            res.json(todo);
        }, next);
    });

module.exports = app;
