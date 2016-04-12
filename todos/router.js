'use strict';

const Todo = require('./models').Todo;
const express = require('express');
const router = express.Router();


function index(req, res) {
    res.render('todos/index.html');
}

function list(req, res) {
    Todo.find({}).exec().then(function(data) {
        res.send(data);
    });
}

function add(req, res) {
    const body = req.body;

    Todo.create({text: body.text})
        .then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.status(400).json({message: err.message});
        });
}

function del(req, res) {
    const id = req.params.id;

    Todo.remove({_id: id})
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            res.status(400).json({message: err.message});
        });
}

function completed(req, res) {
    const id = req.params.id;
    const completed = req.body.completed;

    Todo.update({_id: id}, {completed: completed})
        .then(function() {
            res.json({});
        })
        .catch(function(err) {
            res.status(400).json({message: err.message});
        });
}

router
    .get('/', index)
    .get('/todos', list)
    .post('/todos', add)
    .delete('/todos/:id', del)
    .put('/todos/:id/completed', completed);

module.exports = router;
