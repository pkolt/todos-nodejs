'use strict';

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    safe: true,
    versionKey: false
});

todoSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = {
    Todo: Todo
};
