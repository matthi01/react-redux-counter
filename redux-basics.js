
//using node.js syntax for now - run this in terminal with node redux-basics.js
const redux = require('redux');
const createStore = redux.createStore;

// need to define the initial state which will then be passed into the reducer, store is then created with the reducer
const initialState = {
    counter: 0
}

// Reducer - param state == old state / then returns new state - this should be done in its own file
// need to pass the initial state as a default for the first execution of the reducer
// keep in mind NEVER mutate any data in the state - always pull a copy, make chanages in the copy and then replace the state object
const rootReducer = (state = initialState, action) => {
    let updatedState = {...state};
    switch (action.type) {
        case ('INC_COUNTER'):
            updatedState.counter = updatedState.counter + 1;
            break;
        case ('ADD_COUNTER'):
            updatedState.counter = updatedState.counter + action.value;
            break;
    }
    return updatedState;
};

// Store - store needs a reducer as they are closely tied to each other
// store should be created before the application loads - in index.js usually
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription - takes a function that executes whenever the state is updated / no arguments
// note - adding the subscription before the actions
store.subscribe(() => {
    console.log('[Subscription] -', store.getState())
});

// Dispatching Action - dispatch func takes a type property in an object (has to be 'type')
// this object is an action - convention for type is all caps string
// can also incluude an optional payload
// type is mandatory, all other properties can be whatever you want
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());

