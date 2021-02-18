import * as ActionTypes from './ActionTypes'; 

export const Promotions = (state = { isLoading: true, //re-initalize the state with these parameters initalized as seen here.
                                        errMess: null,
                                        promotions: [] }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_PROMOTIONS:
            return {...state, isLoading: false, errMess: null, promotions: action.payload}; //return the previous state along with the "isLoading" set to false, "errMess" set to null, "promotions" set to the payload

        case ActionTypes.PROMOTIONS_LOADING:
            return {...state, isLoading: true, errMess: null, promotions: []} //return the previous state along with the "isLoading" set to true, "errMess" set to null, "promotions" set to empty array because they are not loaded yet

        case ActionTypes.PROMOTIONS_FAILED:
            return {...state, isLoading: false, errMess: action.payload}; //return the previous state along with the "isLoading" set to false, "errMess" set to the payload
            
        default:
            return state;
      }
};