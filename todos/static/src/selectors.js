import {createSelector} from 'reselect';
import {FILTERS} from './actions';


export const filterTodos = createSelector(
    [
        state => state.todos,
        state => state.filter
    ],
    (todos, filter) => {
        switch (filter) {
            case FILTERS.SHOW_ALL:
                return todos;
            case FILTERS.SHOW_COMPLETED:
                return todos.filter(todo => todo.completed);
            case FILTERS.SHOW_ACTIVE:
                return todos.filter(todo => !todo.completed);
        }
    }
);
