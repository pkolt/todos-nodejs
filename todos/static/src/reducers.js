import {combineReducers} from 'redux';
import {FILTERS, RECEIVE_ADD_TODO, RECEIVE_DELETE_TODO, RECEIVE_COMPLETE_TODO, RECEIVE_TODOS, FILTER_TODO} from './actions';


function todos(state=[], action) {
    switch (action.type) {
        case RECEIVE_ADD_TODO:
            return [...state, action.todo];
        case RECEIVE_DELETE_TODO:
            return state.filter(obj => obj.id !== action.id);
        case RECEIVE_COMPLETE_TODO:
            return state.map(todo => todo.id === action.id ? action.todo : todo);
        case RECEIVE_TODOS:
            return Object.assign([], action.todos);
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
