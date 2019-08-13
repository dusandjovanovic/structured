import {
    USER_FETCH_DATA,
    USER_FETCH_HISTORY,
    USER_INIT,
    USER_END,
    USER_ERROR,
    FRIENDS_FETCH_REQUESTS,
    FRIENDS_CONFIRM_REQUEST,
    FRIENDS_DENY_REQUEST
} from "../actions.js";

const initialState = {
    friends: [],
    requests: [],
    history: [],
    waiting: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_INIT:
            return {
                ...state,
                waiting: true
            };
        case USER_END:
            return {
                ...state,
                waiting: false
            };
        case USER_ERROR:
            return {
                ...state,
                error: action.error,
                waiting: false
            };
        case USER_FETCH_DATA:
            return {
                ...state,
                friends: [...action.friends]
            };
        case USER_FETCH_HISTORY:
            return {
                ...state,
                history: [...action.history]
            };

        case FRIENDS_FETCH_REQUESTS:
            return {
                ...state,
                requests: [...action.requests]
            };
        case FRIENDS_CONFIRM_REQUEST: {
            let sender;
            for (let iter = 0; iter < state.requests.length; iter++)
                if (state.requests[iter]["_id"] === action.requestId)
                    sender = state.requests[iter].sender;
            let friends = [...state.friends];
            friends.push(sender);
            return {
                ...state,
                friends: friends,
                requests: [...state.requests].filter(
                    element => element["_id"] !== action.requestId
                )
            };
        }
        case FRIENDS_DENY_REQUEST:
            return {
                ...state,
                requests: [...state.requests].filter(
                    element => element["_id"] !== action.requestId
                )
            };
        default:
            return state;
    }
};

export default reducer;
