import React, {Component, PropTypes} from 'react';
import {Table} from 'react-bootstrap';
import Todo from './Todo';


class TodoList extends Component {
    componentDidMount() {
        this.props.loadTodos();
    }

    componentWillUnmount() {
        // Здесь нужно отменить запрос при размонтировании компонента.
    }

    render() {
        return (
            <Table>
                <tbody>
                {this.props.todos.map(todo =>
                    <Todo {...todo}
                        key={todo.id}
                        completeTodo={this.props.completeTodo}
                        deleteTodo={this.props.deleteTodo}
                    />
                )}
                </tbody>
            </Table>
        )
    }
}

TodoList.propTypes = {
    loadTodos: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired
};

export default TodoList;
