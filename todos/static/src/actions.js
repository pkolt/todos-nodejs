// Типы действий
export const REQUEST_TODOS = 'REQUEST_TODOS';
export const RECEIVE_TODOS = 'RECEIVE_TODOS';
export const REQUEST_ADD_TODO = 'REQUEST_ADD_TODO';
export const RECEIVE_ADD_TODO = 'RECEIVE_ADD_TODO';
export const REQUEST_DELETE_TODO = 'REQUEST_DELETE_TODO';
export const RECEIVE_DELETE_TODO = 'RECEIVE_DELETE_TODO';
export const REQUEST_COMPLETE_TODO = 'REQUEST_COMPLETE_TODO';
export const RECEIVE_COMPLETE_TODO = 'RECEIVE_COMPLETE_TODO';
export const FILTER_TODO = 'FILTER_TODO';


// Прочие константы
export const FILTERS = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};


// Генераторы действий
export function requestPosts() {
    return dispatch => {
        dispatch({type: REQUEST_TODOS});
        return fetch('/todos').then(res => res.json()).then(todos => dispatch({type: RECEIVE_TODOS, todos}));
    }
}

export function addTodo(text) {
    return dispatch => {
        dispatch({type: REQUEST_ADD_TODO, text});
        return fetch('/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text: text})
        }).then(res => res.json()).then(todo => dispatch({type: RECEIVE_ADD_TODO, todo}));
    }
}

export function deleteTodo(id) {
    return dispatch => {
        dispatch({type: REQUEST_DELETE_TODO, id});
        return fetch('/todo', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        }).then(res => res.json()).then(() => dispatch({type: RECEIVE_DELETE_TODO, id}));
    }
}

export function completeTodo(id) {
    return (dispatch, getState) => {
        dispatch({type: REQUEST_COMPLETE_TODO, id});
        
        const state = getState();
        const todo = state.todos.filter(todo => todo.id === id)[0];
        
        return fetch('/todo', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id, completed: !todo.completed})
        }).then(res => res.json()).then(todo => dispatch({type: RECEIVE_COMPLETE_TODO, id, todo}));
    }
}

export function filterTodo(filter) {
    return {type: FILTER_TODO, filter};
}
