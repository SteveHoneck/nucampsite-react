import * as ActionTypes from './ActionTypes'; //Import action types with wildcard *, that lets us import ALL the named exports at once. "as ActionTypes" defines what is called the ActionTypes namespace.
import { baseUrl } from '../shared/baseUrl'; 


//Use Redux-thunk to perform an asynchrnoys request to a server (server is not set up in our example, using json server)
export const fetchCampsites = () => dispatch => { //Action creator. Redux-thunk syntax, wrap a function inside a function and pass the store's "dispatch" method into the inner funtion
    dispatch(campsitesLoading()); //"dispatch" method is used here to dispatch a different action, "campsitesLoading"

    return fetch(baseUrl + 'campsites') //call to fetch and pass in the base url and add the string "campsites" to the end of the url because thats where the data we want is located
        .then(response => { //Will run when the promise that returns from this fetch resolves, which happens when the server returns a response. Response can be bad or good.
            if (response.ok) { //Fetch's easy way "response.ok" will be set to true in the response is in the successful range 200-299, returns false otherwise
                return response;
            } else { //If response not okay, throw an error that will be caught by the catch block
                const error = new Error(`Error ${response.status}: ${response.statusText}`); // ".status" and ".statusText" are built in properties of Fetch's response objest.
                error.response = response; //No explanation 
                throw error;//No explanation 
            }
        },
        error => { //Second call back method as a fallback for the ".then" method to handle a rejected promise (means no response from the server at all, good or bad)
            const errMess = new Error(error.message); //Create and throw an error
            throw errMess;
        }
    )
    .then(response => response.json()) //Chain a ".then" method. A call to "fetch" will return a "promise". When that promise is resolved, this "then" method will use the ".json" method to convert the response from .json to JS. The JS will be the array of campsites. ".json" method returns a new promise for which the converted JS array is the new response value when the promise resolves. Can chain another ".then" method to grab that JS array 
    .then(campsites => dispatch(addCampsites(campsites))) //"Campsites=>" argument grabs the campsites JS array from the ".json" promise resolution above. Then the "campsites" argument is dispatched with the "addCampsites" action creator to be used as its payload.    
    .catch(error => dispatch(campsitesFailed(error.message))); //Catches any errors when thrown
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

export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => {
            const errMess = new Error(error.message); 
            throw errMess;
        }
    )

    .then(response => response.json()) //Access the array as the "response" if the fetch was successful. Use the "json()" method to convert the json data to a JS array.
    .then(comments => dispatch(addComments(comments))) //if the above works, we'll dispatch those comments to be added to the redux store.
    .catch(error => dispatch(commentsFailed(error.message)));//Catch method that will dispatch the "commentsFailed" action.
};

export const commentsFailed = errMess => ({ //Action creator for adding comments. Normal action creator that return action objects. Not using Redux Thunk (so only 1 arrow function required). The parameter of "errMess" and will create an object with a type and payload containing the "errMess" that was passed in
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addComments = comments => ({ //Action creator for adding comments. Normal action creator that return action objects. Not using Redux Thunk (so only 1 arrow function required). Takes a parameter of "comments" and passes it to the payload.
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const addComment = comment => ({ //Updates the local redux store. Makes an action with an action type and payload of comment
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

//Handles asynchronous calls to Fetch and post the comment to the server. Have to make it Thunk by nesting arrow functions.
export const postComment = (campsiteId, rating, text) => dispatch => { //Action creator is using Thunk middle ware so that it can handle asynchronous calls inside it. Must pass in all values that are needed to add a comment. 
    const newComment = { //Pass the arguments into an object called "newComment"
        campsite: campsiteId,
        rating: rating,
        text: text
    };
    const bearer = 'Bearer ' + localStorage.getItem('token'); //Added for Integration

    return fetch(baseUrl + 'comments', {//Set up Fetch. Returning a call to Fetch and give it a Url. 
            method: "POST", //Pass Fetch an optional second argument in the form of an object.
            body: JSON.stringify(newComment), //Request "body" property will be a json encoded version of the "newComment" object we created above.
            headers: { //Requet "header" must be an object itself so it can hold more than 1 header
                "Content-Type": "application/json", //Server knows to expect the "body" to be formatted as json.
                'Authorization': bearer //Added for Integration
            },
            credentials: 'same-origin' //Added for Integration
        })
        .then(response => { //Handles the resolve / reject from the fetch promise above
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => { throw error; } //This is what will happen if the promise is rejected. It will throw an error to the next catch block
        )
        .then(response => response.json()) //When a post request is successful, json server will send back the data that you sent but will insert a unique ID along with it. Convert the response back to JS with this ".json" method & dispatch it with the line below
        .then(response => dispatch(addComment(response))) //Updates the redux store with the JS response created in the line above
        .catch(error => { //Catches any rejected promises or throws and let us know that something went long
            console.log('post comment', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        });
};

export const fetchPromotions = () => dispatch => { //Thunk. Operates just like the one for "fetchCampsites".
    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message); 
                throw errMess;
            }
        )
    
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));//"catch" method that will dispatch "promotionsFailed"
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


export const fetchPartners = () => dispatch => { //Thunk. Operates just like the one for "fetchCampsites".
    dispatch(partnersLoading());

    return fetch(baseUrl + 'partners')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message); 
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(partners => dispatch(addPartners(partners)))
        .catch(error => dispatch(partnersFailed(error.message)));
};

export const partnersLoading = () => ({ //Same as the "campsitesLoading" action creators above, but for partners
    type: ActionTypes.PARTNERS_LOADING
});

export const partnersFailed = errMess => ({//Same as the "campsitesFailed" action creators above, but for partners
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMess
});

export const addPartners = partners => ({//Same as the "addCampsites" action creators above, but for partners
    type: ActionTypes.ADD_PARTNERS,
    payload: partners
});


export const postFeedback = (feedback) => () => {
    return fetch(baseUrl + 'feedback', {
        method: "POST", 
        body: JSON.stringify(feedback), 
        headers: { 
            "Content-Type": "application/json" 
        },
    })
    .then((response) => { 
        if (response.ok) {
            return response;
        } else {
            const error = new Error(`Error ${response.status}: ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
        (error) => {
            throw error;
        }  
    )
    .then((response) => response.json())
    .then((response) => {
        console.log(response)
        alert("Thank you for your feedback!\n" + JSON.stringify(response));
      })
      .catch((error) => {
        alert("Your feedback could not be posted\nError: " + error.message);
      });
};

/*Added for Integration: All login and auth action creators*/
export const requestLogin = creds => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = response => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = message => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = creds => dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage.
            localStorage.setItem('token', response.token); //"localStorage" is a web browser API available in all modern web browsers, not React or Redux method
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            dispatch(fetchFavorites());
            dispatch(receiveLogin(response));
        } else {
            const error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
        type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
        type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(favoritesFailed('Error 401: Unauthorized'));
    dispatch(receiveLogout())
}


/*Added for Integration: All Favorite action creators*/
export const postFavorite = campsiteId => dispatch => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + campsiteId, {
        method: 'POST',
        headers: {
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(favorites => {
        console.log('Favorite Added', favorites);
        dispatch(addFavorites(favorites));
    })
    .catch(error => dispatch(favoritesFailed(error.message)));
}

export const deleteFavorite = campsiteId => dispatch => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + campsiteId, {
        method: 'DELETE',
        headers: {
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(favorites => {
        console.log('Favorite Deleted', favorites);
        dispatch(addFavorites(favorites));
    })
    .catch(error => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => dispatch => {
    dispatch(favoritesLoading());

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(favorites => dispatch(addFavorites(favorites)))
    .catch(error => dispatch(favoritesFailed(error.message)));
}

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = errMess => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errMess
});

export const addFavorites = favorites => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorites
});
