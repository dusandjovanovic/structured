import * as actionTypes from '../actions/actions'

const initialState = {
    token: null,
    username: null,
    error: null,
    waiting: null,
    authRedirectPath: '/'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                waiting: true
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                username: action.userId,
                error: null,
                waiting: false
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                waiting: false
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                username: null
            };
        case actionTypes.AUTH_SET_REDIRECT:
            return {
                ...state,
                authRedirectPath: action.path
            };
        default:
            return state;
    }
};

export default reducer;