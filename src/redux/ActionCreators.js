import * as ActionTypes from './ActionTypes'; //Import action types with wildcard *, that lets us import ALL the named exports at once. "as ActionTypes" defines what is called the ActionTypes namespace.
import { CAMPSITES } from '../shared/campsites'; //Added so it can be used in server delay simulation

export const addComment = (campsiteId, rating, author, text) => ({ //Action creator function, must pass in all values that are needed to add a comment. Returns an object that has "type" and "payload" as its properties.
    type: ActionTypes.ADD_COMMENT, //"ActionTypes." is a namespace defined above, using the "." notation allows us to access the named exports from that file.
    payload: { //Pass the arguments into a object. In ES6, if the name of a property of an object is the same as its value, the property can be written as "campsiteId" instead of "campsiteId: campsiteId"
        campsiteId: campsiteId,
        rating: rating,
        author: author,
        text: text
    }
});

//Use Redux-thunk to perform an asynchrnoys request to a server (server is not set up in our example) so pretend we are talking to server by simulating a brief delay. After delay, we will add the camsites data to the state.
export const fetchCampsites = () => dispatch => { //Action creator. Redux-thunk syntax, wrap a function inside a function and pass the store's "dispatch" method into the inner funtion

    dispatch(campsitesLoading()); //"dispatch" method is used here to dispatch a different action, "campsitesLoading"

    setTimeout(() => { //Add in a delay before dispatching the "addCampsites" action along with data from CAMPSITES array
        dispatch(addCampsites(CAMPSITES));
    }, 2000);
};

export const campsitesLoading = () => ({ //Not using Thunk, only one arrow function, standard action creator that just returns an action object. This is dispactched from the "fetchCampsites" above so that when the "fetchCampsites" action is dispatched, this action will also be dispatched.
    type: ActionTypes.CAMPSITES_LOADING
});

export const campsitesFailed = errMess => ({ //Not using Thunk, pass in "errMess" into this funciton & use as payload
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

export const addCampsites = campsites => ({ //Not using Thunk, has a "campsites" parameter. Using "campsites" as argument passed in (should be an array) & uses it as the payload
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});