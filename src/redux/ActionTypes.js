export const ADD_CAMPSITES = 'ADD_CAMPSITES'; //Dispatch when the campsites data has been sucessfuly retreived from server and can be added to the state
export const CAMPSITES_LOADING = 'CAMPSITES_LOADING'; //Will be for when the app is loading the campsites data and it has not received the data yet, just made the request and waiting for a response
export const CAMPSITES_FAILED = 'CAMPSITES_FAILED';//When the server request has failed for some reason and couldn't load data, will let the store know and show an error

export const ADD_COMMENT = 'ADD_COMMENT'; //THis creates a variable named "ADD_COMMENT", setting its value to the string 'ADD_COMMENT' & exporting it. Import it into the ActionCreators.js file.
export const ADD_COMMENTS = 'ADD_COMMENTS'; //Added for Exercise: Fetch from Server
export const COMMENTS_FAILED = 'COMMENTS_FAILED'; //Added for Exercise: Fetch from Server

export const ADD_PROMOTIONS = 'ADD_PROMOTIONS'; //Added for Exercise: Fetch from Server
export const PROMOTIONS_LOADING = 'PROMOTIONS_LOADING'; //Added for Exercise: Fetch from Server
export const PROMOTIONS_FAILED = 'PROMOTIONS_FAILED'; //Added for Exercise: Fetch from Server

export const ADD_PARTNERS = 'ADD_PARTNERS';
export const PARTNERS_LOADING = 'PARTNERS_LOADING';
export const PARTNERS_FAILED = 'PARTNERS_FAILED';

//Added for Integration
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const FAVORITES_LOADING = 'FAVORITES_LOADING';
export const FAVORITES_FAILED = 'FAVORITES_FAILED';
export const ADD_FAVORITES = 'ADD_FAVORITES';