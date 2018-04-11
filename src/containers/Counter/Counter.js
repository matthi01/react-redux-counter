import React, { Component } from 'react';
import {connect} from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

// to avoid spelling mistakes, define all actions as constants, and import them
import * as actionCreators from '../../store/actions/index';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {

        let resultsList = [];
        resultsList = this.props.storedResults.map(result => {
            return <li onClick={() => this.props.onRemoveResult(result.key)} key={result.key}>{result.value}</li>
        });

        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {resultsList}
                </ul>
            </div>
        );
    }
}

// props cannot be changed internally, that is why redux state is mapped to props instead of component state
// stores a function - takes state from redux as input / returns object map of prop names and slices of 
//                     state stored in redux
// state parameter is provided by redux - need to just define the prop names and slices of that state
// need to include .ctr. and .res. because of the combined reducers
const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
    };
};

// second piece of config - what kind of actions to dispatch from this component
// takes dispatch argument - which comes from redux - dispatch == function
// returns object with prop names which hold references to functions which will get executed to dispatch an action
// this way the dispatch() function is made available through a specific property
// same as before, the dispatch function holds a type and optional values
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        onDecrementCounter: () => dispatch(actionCreators.decrement()),
        onAddCounter: () => dispatch(actionCreators.add(5)),
        onSubtractCounter: () => dispatch(actionCreators.subtract(5)),
        onStoreResult: (counterResult) => dispatch(actionCreators.storeResult(counterResult)),
        onRemoveResult: (key) => dispatch(actionCreators.removeResult(key))
        
        // *** keeping these as reference, this is another way to create the action dispatch without using action creators - action creators main benefit is executing asynchronous code
        // onStoreResult: (counterResult) => dispatch({type: actionTypes.STORE_RESULT, counterResult: counterResult}),
        // onRemoveResult: (key) => dispatch({type: actionTypes.REMOVE_RESULT, key: key})
    };
};

// connect is NOT a higher order component - don't wrap the export
// it is a function that returns a function which then takes a component as an input
// reason being that this way you can pass configuration parameters to the connect function
// needs two pieces of information 
// - which part of the app state is interesting to this component
// - which actions to dispatch
export default connect(mapStateToProps, mapDispatchToProps)(Counter);