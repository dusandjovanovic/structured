import {
    ROOM_INIT,
    ROOM_END,
    ROOM_DATA,
    ROOM_ALL,
    ROOM_CREATE,
    ROOM_DELETE,
    ROOM_JOIN,
    ROOM_LEAVE,
    ROOM_GRAPH,
    ROOM_GRAPH_CHANGE,
    ROOM_ERROR
} from "../actions.js";

const initialState = {
    rooms: [],
    room: {
        name: null,
        master: false
    },
    data: {
        _id: null,
        users: []
    },
    waiting: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ROOM_INIT:
            return {
                ...state,
                waiting: true,
                error: null
            };
        case ROOM_END:
            return {
                ...state,
                waiting: false
            };
        case ROOM_ALL:
            return {
                ...state,
                rooms: [...action.rooms],
                error: null
            };
        case ROOM_CREATE:
            return {
                ...state,
                room: {
                    name: action.name,
                    master: true
                },
                error: null
            };
        case ROOM_DATA:
            return {
                ...state,
                data: action.data,
                room: {
                    ...state.room,
                    master: action.master
                },
                error: null
            };
        case ROOM_JOIN:
            return {
                ...state,
                room: {
                    name: action.name,
                    master: action.master
                },
                error: null
            };
        case ROOM_LEAVE:
            return {
                ...state,
                room: {
                    name: null,
                    master: false
                },
                data: {
                    _id: null,
                    users: []
                },
                error: null
            };
        case ROOM_DELETE:
            return {
                ...state,
                room: {
                    name: null,
                    master: false
                },
                data: {
                    _id: null,
                    users: []
                },
                error: null
            };
        case ROOM_GRAPH:
            return {
                ...state,
                data: {
                    ...state.data,
                    graph: action.graph
                }
            };
        case ROOM_GRAPH_CHANGE:
            return {
                ...state,
                data: {
                    ...state.data,
                    graph: action.graph
                }
            };
        case ROOM_ERROR:
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
