import * as actionTypes from './actionTypes';

// synchronous action creator to be used in the middleware allowing it to be run asynchronously
export const saveResult = (counterResult) => {
    return {
        type: actionTypes.STORE_RESULT,
        counterResult: counterResult
    }
}

// playing around with executing asynchronous code with redux
// instead of connecting to a server, just going to set a timeout to simulate the same thing
export const storeResult = (counterResult) => {
    // returns a function - this function gets 'dispatch' from redux-thunk
    // this will hold the original action and dispatch it after
    // so asynch code can now run within this function that is returned
    return dispatch => {
        setTimeout(() => {
            dispatch(saveResult(counterResult))
        }, 500);
    }
};

export const removeResult = (key) => {
    return {
        type: actionTypes.REMOVE_RESULT,
        key: key
    }
};