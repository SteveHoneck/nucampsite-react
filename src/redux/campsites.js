//Removed import of CAMPSITES when adding in Thunk because CAMPSITES will now be recieved as an action
import * as ActionTypes from './ActionTypes'; 

//Campsites is a named export that is a reducer funciton (capitilized the function name & used arrow funciton, but not required) that handles the CAMPSITES section of the state. All reducers take 2 paramters: the first parameter is the previous state (called existing or current state, the state that is already in the store) that is going to be changed by the reducer, the second parameter is an "action" object
export const Campsites = (state = { //State will hold 3 different properties due to using Thunk, all initalized with the default function parameter syntax. Before Thunk, this part of the state just held the CAMPSITES directly.
        isLoading: true,
        errMess: null,
        campsites: [] 
    }, action) => { 
    switch (action.type) { //Check for the type of the action and return "state".
        case ActionTypes.ADD_CAMPSITES:
            return {...state, isLoading: false, errMess: null, campsites: action.payload}; //Return a new state that consists of the previous state, & update values to say it's no longer loading, there is no error message, and "campsites" will be updated with the payload.
        case ActionTypes.CAMPSITES_LOADING:
            return {...state, isLoading: true, errMess: null, campsites: []}; //Return a new state that consists of the pervious state, say loading is true, errMess is null and campsites is an empty array because it's not finished loading yet.
        case ActionTypes.CAMPSITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload}; //Don't need to update the campsites array for this one.
        default:
            return state;
    }
};