//Removed import of comments from shared folder, they now come from json server.
import * as ActionTypes from './ActionTypes'; //Wildcard * used to import everything from "ActionTypes"


export const Comments = (state = { errMess: null, comments: []}, action) => {//Data recieved into the comments part of the state is no longer a simple array (as when it was "state = COMMENTS"), it is an object containing an error message "errMess" (initialized to null) and an array of comments (initialized to an empty array) 
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS: //Will return the previous state updated with a "null" error message, and the "comments" array from the action payload
            return {...state, errMess: null, comments: action.payload};

        case ActionTypes.COMMENTS_FAILED: //Will return the previous state along with the error message from the action payload.
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_COMMENT:
            const comment = action.payload; //Create new variable to hold the content of action.payload (the content is an object).
            return {...state, comments: state.comments.concat(comment)}; //Return the new state by using the array "concat" method. This method is a built in JS array method that lets us attach a new item to the end of an array without mutating the original array. A new array is created (the "push" array method would mutate the original array, so we can't use push). This line takes the exisiting state which is an object containing an error message and array of comments objects, & it spreads the existing state but concatonates the new "comment" object to the end of the array then returns the new state to the Redux store.
        default:
            return state;
    }
};