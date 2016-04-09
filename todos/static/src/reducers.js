import {combineReducers} from 'redux';
import {FILTERS, LOAD_TODOS_SUCCESS, ADD_TODO_SUCCESS, DELETE_TODO_SUCCESS, COMPLETE_TODO_SUCCESS, FILTER_TODO} from './actions';


function todos(state=[], action) {
    switch (action.type) {
        case LOAD_TODOS_SUCCESS:
            return Object.assign([], action.todos);
        case ADD_TODO_SUCCESS:
            return [...state, action.todo];
        case DELETE_TODO_SUCCESS:
            return state.filter(obj => obj.id !== action.id);
        case COMPLETE_TODO_SUCCESS:
            return state.map(todo => todo.id === action.id ? Object.assign({}, todo, {completed: action.completed}) : todo);
        default:
            return state;
    }
}

function filter(state=FILTERS.SHOW_ALL, action) {
    switch (action.type) {
        case FILTER_TODO:
            return action.filter;
        default:
            return state;
    }
}

export default combineReducers({filter, todos});
