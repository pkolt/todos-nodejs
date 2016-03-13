import React, {Component, PropTypes} from 'react';
import {Glyphicon} from 'react-bootstrap';


class Todo extends Component {
    handlerDeleteTodo(e) {
        this.props.deleteTodo(this.props.id);
    }
    
    handlerCompleteTodo(e) {
        this.props.completeTodo(this.props.id);
    }

    render() {
        const textStyle = {
            width:'100%',
            textDecoration: this.props.completed ? 'line-through' : 'none',
            color: this.props.completed ? '#ccc' : '#000',
            cursor: 'pointer'
        };

        return (
            <tr>
                <td style={textStyle} onClick={e => this.handlerCompleteTodo(e)}>
                    {this.props.text}
                </td>
                <td>
                    <Glyphicon glyph="trash" title="Удалить" style={{cursor: 'pointer'}} onClick={e => this.handlerDeleteTodo(e)}/>
                </td>
            </tr>
        )
    }
}

Todo.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    
    completeTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
};

export default Todo;
