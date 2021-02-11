import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';

export const initialState = { //Initial state of the app, received straight from the data files. Keyword "export" makes the const available to other files.
    campsites: CAMPSITES,
    comments: COMMENTS,
    partners: PARTNERS,
    promotions: PROMOTIONS
};

export const Reducer = (state = initialState, action) => { //This uses default funciton parameters so that if there is no state passed in then the state gets set to the initial state object. Takes an "action" as a parameter.
    return state;
}