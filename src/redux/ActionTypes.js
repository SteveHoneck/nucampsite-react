export const ADD_COMMENT = 'ADD_COMMENT'; //THis creates a variable named "ADD_COMMENT", setting its value to the string 'ADD_COMMENT' & exporting it. Import it into the ActionCreators.js file.
export const CAMPSITES_LOADING = 'CAMPSITES_LOADING'; //Will be for when the app is loading the campsites data and it has not received the data yet, just made the request and waiting for a response
export const CAMPSITES_FAILED = 'CAMPSITES_FAILED';//When the server request has failed for some reason and couldn't load data, will let the store know and show an error
export const ADD_CAMPSITES = 'ADD_CAMPSITES'; //Dispatch when the campsites data has been sucessfuly retreived from server and can be added to the state
//Below added for Exercise: Fetch from Server
export const ADD_COMMENTS = 'ADD_COMMENTS'; //
export const COMMENTS_FAILED = 'COMMENTS_FAILED';
export const PROMOTIONS_LOADING = 'PROMOTIONS_LOADING';
export const ADD_PROMOTIONS = 'ADD_PROMOTIONS';
export const PROMOTIONS_FAILED = 'PROMOTIONS_FAILED';