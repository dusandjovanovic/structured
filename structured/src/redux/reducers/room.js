import * as actionTypes from '../actions/actions';

const initialState = {
    rooms: [],
    room: null,
    data: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ROOM_ALL:
            return {
                ...state,
                rooms: [...action.rooms]
            };
        case actionTypes.ROOM_CREATE:
            return {
                ...state,
                room: {
                    name: action.name,
                    master: true
                },
                data: action.data
            };
        case actionTypes.ROOM_JOIN:
            return {
                ...state,
                room: {
                    name: action.name,
                    master: false
                },
                data: action.data
            };
        case actionTypes.ROOM_EXIT:
            return {
                ...state,
                room: null,
                data: null
            };
        case actionTypes.ROOM_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};

export default reducer;