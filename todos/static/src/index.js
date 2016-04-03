import 'babel-polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import App from './containers/App';

// Логгирование действий.
const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
};

// Перехват ошибок.
const crashReporter = store => next => action => {
    try {
        return next(action);
    } catch (err) {
        console.error('Caught an exception!', err);
        throw err;
    }
};

const store = createStore(rootReducer, applyMiddleware(thunk, logger, crashReporter));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
