import { createStore, combineReducers } from 'redux';
//import separate reducers that we created from splitting the reducers
import { Campsites } from './campsites';
import { Comments } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';

export const ConfigureStore = () => { //Named export
    const store = createStore( //Create "store" variable using "createStore" function that was imported from Redux, "createStore" function will only accept 1 reducer function. "createStore()" used to take arguments in "Reducer" function & "initialState" object from reducer.js file before the reducers were split.
        combineReducers({ //Pass it an object that contains all of our reducers as properties of that object. 
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions
        }) 
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()   //ADD THIS TO USE DEV TOOLS IN CHROME
    );

    return store;
};