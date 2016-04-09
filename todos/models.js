'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 1
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
