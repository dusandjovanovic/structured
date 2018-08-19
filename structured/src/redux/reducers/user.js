import * as actionTypes from '../actions/actions';

const initialState = {
    username: null,
    friends: [],
    requests: [],
    userData: null,
    waiting: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_FETCH_DATA:
            return {
                ...state,
                username: action.username,
                friends: action.friends
            };
        case actionTypes.USER_FETCH_ALL_DATA:
            return {
                ...state,
                userData: action.userData
            };
        case actionTypes.USER_FETCH_DATA_START:
            return {
                ...state,
                waiting: true
            };
        case actionTypes.USER_FETCH_DATA_END:
            return {
                ...state,
                waiting: null
            };
        case actionTypes.USER_FETCH_DATA_FAIL:
            return {
                username: null,
                friends: null,
                userData: null,
                error: action.error,
                waiting: null
            };
        case actionTypes.FRIENDS_FETCH_REQUESTS:
            return {
                ...state,
                requests: [...action.requests]
            };
        default:
            return state;
    }
};

export default reducer;