import * as actionTypes from '../actions/actions';

const initialState = {
    rooms: [],
    room: {
        name: null,
        master: false
    },
    data: {
        _id: null
    },
    waiting: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ROOM_START:
            return {
                ...state,
                waiting: true,
                error: null
            };
        case actionTypes.ROOM_END:
            return {
                ...state,
                waiting: false
            };
        case actionTypes.ROOM_ALL:
            return {
                ...state,
                rooms: [...action.rooms],
                error: null
            };
        case actionTypes.ROOM_CREATE:
            return {
                ...state,
                room: {
                    name: action.name,
                    master: true
                },
                error: null
            };
        case actionTypes.ROOM_DATA:
            return {
                ...state,
                data: action.data,
                room: {
                    ...state.room,
                    master: action.master
                },
                error: null
            };
        case actionTypes.ROOM_JOIN:
            return {
                ...state,
                room: {
                    name: action.name,
                    master: action.master
                },
                error: null
            };
        case actionTypes.ROOM_LEAVE:
            return {
                ...state,
                room: {
                    name: null,
                    master: false
                },
                data: {
                    _id: null
                },
                error: null
            };
        case actionTypes.ROOM_DELETE:
            return {
                ...state,
                room: {
                    name: null,
                    master: false
                },
                data: {
                    _id: null
                },
                error: null
            };
        case actionTypes.ROOM_ERROR:
            return {
                ...state,
                waiting: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default reducer;