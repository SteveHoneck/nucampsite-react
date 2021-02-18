import * as ActionTypes from './ActionTypes'; //Import action types with wildcard *, that lets us import ALL the named exports at once. "as ActionTypes" defines what is called the ActionTypes namespace.
import { baseUrl } from '../shared/baseUrl'; 

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

    return fetch(baseUrl + 'campsites') //call to fetch and pass in the base url and add the string "campsites" to the end of the url because thats where the data we want is located
    .then(response => response.json()) //Chain a ".then" method. A call to "fetch" will return a "promise". When that promise is resolved, this "then" method will use the ".json" method to convert the response from .json to JS. The JS will be the array of campsites. ".json" method returns a new promise for which the converted JS array is the new response value when the promise resolves. Can chain another ".then" method to grab that JS array 
    .then(campsites => dispatch(addCampsites(campsites))); //"Campsites=>" argument grabs the campsites JS array from the ".json" promise resolution above. Then the "campsites" argument is dispatched with the "addCampsites" action creator to be used as its payload.    
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


//Below Action Creators added as part of Exercise: Fetch from Server

export const fetchComments = () => dispatch => {  //This is a Thunk action creator with the two double arrows and the "dispatch" argument passed into the inner arrow function. 
    return fetch(baseUrl + 'comments') //set up fetch call for comments (Just like for "fetchCampsites"). Send the fetch request to the json server which is running at the address stored in "baseUrl" and ask for the "comments" resource which should return a promise for an array of comments objects.
        .then(response => response.json()) //Access the array as the "response" if the fetch was successful. Use the "json()" method to convert the json data to a JS array.
        .then(comments => dispatch(addComments(comments))); //if the above works, we'll dispatch those comments to be added to the redux store.
};

export const commentsFailed = errMess => ({ //Action creator for adding comments. Normal action creator that return action objects. Not using Redux Thunk (so only 1 arrow function required). The parameter of "errMess" and will create an object with a type and payload containing the "errMess" that was passed in
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({ //Action creator for adding comments. Normal action creator that return action objects. Not using Redux Thunk (so only 1 arrow function required). Takes a parameter of "comments" and passes it to the payload.
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromotions = () => dispatch => { //Thunk. Operates just like the one for "fetchCampsites".
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)));
};

export const promotionsLoading = () => ({ //Same as the "campsitesLoading" action creators above, but for promotions
    type: ActionTypes.PROMOTIONS_LOADING
});

export const promotionsFailed = errMess => ({//Same as the "campsitesFailed" action creators above, but for promotions
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

export const addPromotions = promotions => ({//Same as the "addCampsites" action creators above, but for promotions
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});