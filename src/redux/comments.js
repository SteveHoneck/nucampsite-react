import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes'; //Wildcard * used to import everything from "ActionTypes"

export const Comments = (state = COMMENTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            const comment = action.payload; //Create new variable to hold the content of action.payload (the content is an object).
            comment.id = state.length; //Add an "id" property that will be the length of the comments array that is stored in this part of the state
            comment.date = new Date().toISOString(); //Add a "date" property that will be today's date. 
            return state.concat(comment); //Return the new state by using the array "concat" method. This method is a built in JS array method that lets us attach a new item to the end of an array without mutating the original array. A new array is created (the "push" array method would mutate the original array, so we can't use push). This line takes the exisiting state which is an array of objects & it concatonates the new "comment" object to the end of the array then returns the new state to the Redux store.
        default:
            return state;
    }
};