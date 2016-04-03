import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import {Grid, Panel} from 'react-bootstrap';

import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';
import {loadTodos, addTodo, deleteTodo, completeTodo, filterTodo, FILTERS} from '../actions';


class App extends Component {
    render() {
        const {dispatch, todos, filter} = this.props;
        const footer = <Footer
            filter={filter}
            onFilterChange={filter => dispatch(filterTodo(filter))}
        />;
        return (
            <Grid>
                <h1>Список дел</h1>
                <Panel footer={footer}>
                    <AddTodo
                        addTodo={text => dispatch(addTodo(text))}
                    />
                    <TodoList
                        todos={todos}
                        loadTodos={() => dispatch(loadTodos())}
                        completeTodo={id => dispatch(completeTodo(id))}
                        deleteTodo={id => dispatch(deleteTodo(id))}
                    />
                </Panel>
            </Grid>
        )
    }
}

function selectTodos(todos, filter) {
    switch (filter) {
        case FILTERS.SHOW_ALL:
            return todos;
        case FILTERS.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed);
        case FILTERS.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed);
    }
}

function select(state) {
    return {
        todos: selectTodos(state.todos, state.filter),
        filter: state.filter
    }
}

export default connect(select)(App);
