import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

// adding middleware - this has to be a function that returns another function
// 'next' function is executed is executed to let the action continue to the reducer
// 'next' function will return another function which will hold the action itself
// this 'action' function will hold the code that can be executed after the action but before the reducer 
// at the end of the code, need to execute 'next' with the action as an argument
// --could even store the result of the action, perform more code, then return the original result
const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
}

// composeEnhancers is used to let the redux DevTools browser extension know of the store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// need to create the store before loading the app
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

// hook up the store with the Provider component from redux-react - pass in the store via the store property
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
