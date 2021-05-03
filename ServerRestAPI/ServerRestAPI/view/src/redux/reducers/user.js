import {

    UPDATE_USER_AUTHENTICATION_STATUS,

} from "../actionTypes";

const initialState = {
    userData: {},
    authenticated: null
};

export default function (state = initialState, action) {
    switch (action.type) {        
        case UPDATE_USER_AUTHENTICATION_STATUS: {
            state.userData = action.user;
            state.authenticated = action.authenticated;
            return {
                ...state,
                authenticated: action.authenticated,
                userData: action.user
            }
        }
        default:
            return state;
    }
}