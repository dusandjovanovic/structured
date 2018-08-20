import * as actionTypes from '../actions/actions';

const initialState = {
    username: null,
    friends: [],
    requests: [],
    history: [],
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
        case actionTypes.USER_FETCH_HISTORY:
            return {
                ...state,
                history: action.history
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
                friends: [],
                requests: [],
                history: [],
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