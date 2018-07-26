import * as actionTypes from '../actions/actions';

const initialState = {
    username: null,
    friends: null,
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
        case actionTypes.USER_FETCH_DATA_FAIL:
            return {
                username: null,
                friends: null,
                error: action.error
            };
        default:
            return state;
    }
};

export default reducer;