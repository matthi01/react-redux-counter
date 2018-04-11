import * as actionTypes from '../../store//actions/actionTypes';

const initialState = {
    results: []
};

const reducer = (state = initialState, action) => {
    let updatedState = {...state};
    switch (action.type) {
        case (actionTypes.STORE_RESULT):
            // copying the object in the beginning does not make a deep copy, so the results array is still a reference to the original
            // use concat here, it'll push a new item to the array and return the array, therefore giving a new one
            // outputting in an array so need a unique key... use a date stamp
            updatedState.results = state.results.concat({key: new Date(), value: action.counterResult});
            console.log(action.counterResult);
            break;
        case (actionTypes.REMOVE_RESULT):
            // same problem as for adding - results array is reference type
            // one way: maybe keep this for reference
            // const key = action.key;
            // const newResults = [...state.results];
            // newResults.splice(key, 1);
            const newResultsArr = state.results.filter(result => {
                if (result.key === action.key) {
                    return false;
                } else {
                    return true;
                }
            });
            updatedState.results = newResultsArr;
            break;
        default:
            return state;
    }
    return updatedState;
}

export default reducer;