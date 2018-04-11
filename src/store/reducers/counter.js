import * as actionTypes from '../../store/actions/actionTypes';
import {updateData} from '../utility';

const initialState = {
    counter: 0
};

//using new utility function to clean up the code a little bit and make it more readable
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.INCREMENT):
             return updateData(state, {counter: state.counter + 1});
        case (actionTypes.DECREMENT):
            return updateData(state, {counter: state.counter - 1});
        case (actionTypes.ADD):
            return updateData(state, {counter: state.counter + action.value});
        case (actionTypes.SUBTRACT):
            return updateData(state, {counter: state.counter - action.value});
        default:
            return state;
    }
}

export default reducer;