import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form'; //Helper function that makes it easy to set up reducers to update the state whenever new form values are submitted. Designed to be used with the "combineReducers" funciton. 
import thunk from 'redux-thunk';
import logger from 'redux-logger';
//import separate reducers that we created from splitting the reducers
import { Campsites } from './campsites';
import { Comments } from './comments';
import { Partners } from './partners';
import { Promotions } from './promotions';
import { InitialFeedback } from './forms';


export const ConfigureStore = () => { //Named export
    const store = createStore( //Create "store" variable using "createStore" function that was imported from Redux, "createStore" function will only accept 1 reducer function. "createStore()" used to take arguments in "Reducer" function & "initialState" object from reducer.js file before the reducers were split.
        combineReducers({ //Pass it an object that contains all of our reducers as properties of that object. Also pass the "createForms" function that contains a model name for the entire form called "feedbackForm" which is given the "InitialFeedback" object for the initial form state.
            campsites: Campsites,
            comments: Comments,
            partners: Partners,
            promotions: Promotions,
            ...createForms({ //Pass to 
                feedbackForm: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger) //"createStore" function will take the "applyMiddleware" function as a second argument so that thunk & logger can be used.  This is all that is required for logger.
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()   //ADD THIS TO USE DEV TOOLS IN CHROME
    );

    return store;
};