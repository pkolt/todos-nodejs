// Типы действий
export const LOAD_TODOS_REQUEST = 'LOAD_TODOS_REQUEST';
export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
export const LOAD_TODOS_FAILURE = 'LOAD_TODOS_FAILURE';

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE';

export const COMPLETE_TODO_REQUEST = 'COMPLETE_TODO_REQUEST';
export const COMPLETE_TODO_SUCCESS = 'COMPLETE_TODO_SUCCESS';
export const COMPLETE_TODO_FAILURE = 'COMPLETE_TODO_FAILURE';

export const FILTER_TODO = 'FILTER_TODO';

// Прочие константы
export const FILTERS = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};


// Генераторы действий
export function loadTodos() {
    return dispatch => {
        dispatch({type: LOAD_TODOS_REQUEST});

        return fetch('/todos')
            .then(res => res.json())
            .then(todos => dispatch({type: LOAD_TODOS_SUCCESS, todos}))
            .catch(error => dispatch({type: LOAD_TODOS_FAILURE, error}));
    }
}


export function addTodo(text) {
    return dispatch => {
        dispatch({type: ADD_TODO_REQUEST, text});

        return fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text: text})
        })
            .then(res => res.json())
            .then(todo => dispatch({type: ADD_TODO_SUCCESS, todo}))
            .catch(error => dispatch({type: ADD_TODO_FAILURE, error}));
    }
}

export function deleteTodo(id) {
    return dispatch => {
        dispatch({type: DELETE_TODO_REQUEST, id});

        return fetch(`/todos/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => dispatch({type: DELETE_TODO_SUCCESS, id}))
            .catch(error => dispatch({type: DELETE_TODO_FAILURE, error}));
    }
}

export function completeTodo(id) {
    return (dispatch, getState) => {
        dispatch({type: COMPLETE_TODO_REQUEST, id});
        
        const state = getState();
        const todo = state.todos.filter(todo => todo.id === id)[0];
        
        return fetch(`/todos/${id}/completed`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({completed: !todo.completed})
        })
            .then(res => res.json())
            .then(todo => dispatch({type: COMPLETE_TODO_SUCCESS, id, todo}))
            .catch(error => dispatch({type: COMPLETE_TODO_FAILURE, error}));
    }
}

export function filterTodo(filter) {
    return {type: FILTER_TODO, filter};
}

export const actionCreators = {
    loadTodos,
    addTodo,
    deleteTodo,
    completeTodo,
    filterTodo
};
