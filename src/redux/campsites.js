import { CAMPSITES } from '../shared/campsites';

export const Campsites = (state = CAMPSITES, action) => { //Named export that is a reducer funciton (capitilized the function name & used arrow funciton, but not required) that handles the CAMPSITES section of the state. All reducers take 2 paramters: the first parameter is the previous state (called existing or current state, the state that is already in the store) that is going to be changed by the reducer, the second parameter is an "action" object
//The first time the reducer is called, the state will not exist, so the defalut function parameter syntax is used ( "state = CAMPSITES" ).
    switch (action.type) { //Check for the type of the action and return "state".
        default:
            return state;
    }
};