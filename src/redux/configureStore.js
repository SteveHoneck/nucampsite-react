import { createStore } from 'redux';
import { Reducer, initialState } from './reducer';

export const ConfigureStore = () => { //Named export
    const store = createStore( //Create "store" variable using "createStore" function that was imported from Redux, pass in "Reducer" function & "initialState" object from reducer.js.
        Reducer,
        initialState
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ADD THIS TO USE DEV TOOLS IN CHROME
    );

    return store;
};