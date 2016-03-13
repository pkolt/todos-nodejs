import React, {Component, PropTypes} from 'react';
import {Input, Button} from 'react-bootstrap';


class AddTodo extends Component {
    render() {
        const button = <Button onClick={e => this.handlerSubmit(e)}>Добавить</Button>;
        return (
            <form onSubmit={e => this.handlerSubmit(e)}>
                <Input type="text" ref="input" placeholder="Что нужно сделать?" buttonAfter={button}/>
            </form>
        )
    }

    handlerSubmit(e) {
        e.preventDefault();

        const node = this.refs.input.getInputDOMNode();
        const text = (node.value || '').trim();
        if (text) {
            this.props.addTodo(text);
            node.value = '';
        }
        return false;
    }
}

AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
};

export default AddTodo;
