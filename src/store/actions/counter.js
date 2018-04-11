import * as actionTypes from './actionTypes';

// action creators
// functions that create and return an action
export const increment = () => {
    return {
        type: actionTypes.INCREMENT
    }
};

export const decrement = () => {
    return {
        type: actionTypes.DECREMENT
    }
};

export const add = (value) => {
    return {
        type: actionTypes.ADD,
        value: value
    }
};

export const subtract = (value) => {
    return {
        type: actionTypes.SUBTRACT,
        value: value
    }
};