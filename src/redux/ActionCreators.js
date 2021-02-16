import * as ActionTypes from './ActionTypes'; //Import action types with wildcard *, that lets us import ALL the named exports at once. "as ActionTypes" defines what is called the ActionTypes namespace.

export const addComment = (campsiteId, rating, author, text) => ({ //Action creator function, must pass in all values that are needed to add a comment. Returns an object that has "type" and "payload" as its properties.
    type: ActionTypes.ADD_COMMENT, //"ActionTypes." is a namespace defined above, using the "." notation allows us to access the named exports from that file.
    payload: { //Pass the arguments into a object. In ES6, if the name of a property of an object is the same as its value, the property can be written as "campsiteId" instead of "campsiteId: campsiteId"
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    }
});