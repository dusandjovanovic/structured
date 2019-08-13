import {
    axios,
    roomJoinRoute,
    roomLeaveRoute,
    roomGetAllRoute,
    roomGetDataRoute,
    roomGetGraphRoute,
    roomChangeGraphRoute,
    roomDeleteRoute,
    roomCreateNewRoute
} from "../../utils/api";

import {
    ROOM_INIT,
    ROOM_END,
    ROOM_DATA,
    ROOM_ALL,
    ROOM_CREATE,
    ROOM_ADD,
    ROOM_DELETE,
    ROOM_JOIN,
    ROOM_LEAVE,
    ROOM_GRAPH,
    ROOM_GRAPH_CHANGE,
    ROOM_ERROR
} from "../actions.js";

const roomCreate = name => {
    return {
        type: ROOM_CREATE,
        name: name
    };
};

const roomAdd = room => {
    return {
        type: ROOM_ADD,
        room: room
    };
};

const roomDelete = () => {
    return {
        type: ROOM_DELETE
    };
};

const roomJoin = name => {
    return {
        type: ROOM_JOIN,
        name: name
    };
};

const roomLeave = username => {
    return {
        type: ROOM_LEAVE,
        username: username
    };
};

const roomInitiate = () => {
    return {
        type: ROOM_INIT
    };
};

const roomEnd = () => {
    return {
        type: ROOM_END
    };
};

const roomData = (data, master) => {
    return {
        type: ROOM_DATA,
        master: master,
        data: data
    };
};

const roomAll = rooms => {
    return {
        type: ROOM_ALL,
        rooms: rooms
    };
};

const roomGraph = graph => {
    return {
        type: ROOM_GRAPH,
        graph: graph
    };
};

const roomGraphChange = graph => {
    return {
        type: ROOM_GRAPH_CHANGE,
        graph: graph
    };
};

const roomError = error => {
    return {
        type: ROOM_ERROR,
        error: error
    };
};

export const roomGetAll = mode => {
    return async dispatch => {
        let response;

        try {
            response = await axios.getInstance().get(roomGetAllRoute(mode));

            if (response.data.success) {
                dispatch(roomAll(response.data.data));
            } else {
                dispatch(roomError(response.data.msg));
            }
        } catch (error) {
            dispatch(roomError(error));
        }

        return response;
    };
};

export const roomGetData = name => {
    return async (dispatch, getState) => {
        let response;

        try {
            response = await axios.getInstance().get(roomGetDataRoute(name));

            if (response.data.success) {
                dispatch(
                    roomData(
                        response.data.data,
                        getState().auth.username ===
                            response.data.data.createdBy
                    )
                );
            } else {
                dispatch(roomError(response.data.msg));
            }
        } catch (error) {
            dispatch(roomError(error));
        }

        return response;
    };
};

export const roomCreateNew = (name, maxUsers, roomType) => {
    return async (dispatch, getState) => {
        dispatch(roomInitiate());
        const payload = {
            name: name,
            maxUsers: maxUsers,
            roomType: roomType,
            createdBy: getState().auth.username
        };

        try {
            const response = await axios
                .getInstance()
                .post(roomCreateNewRoute, payload);

            if (response.data.success) {
                const roomData = await dispatch(roomGetData(name));
                dispatch(roomAdd(roomData.data.data));
                dispatch(roomCreate(roomData.data.data.name));
                dispatch(roomEnd());
            } else {
                dispatch(roomError(response.data.msg));
            }
        } catch (error) {
            dispatch(roomError(error));
        }
    };
};

export const roomJoinExisting = name => {
    return async (dispatch, getState) => {
        dispatch(roomInitiate());
        const payload = {
            roomName: name,
            username: getState().auth.username
        };

        try {
            const response = await axios
                .getInstance()
                .post(roomJoinRoute, payload);

            if (response.data.success) {
                const roomData = await dispatch(roomGetData(name));
                dispatch(roomJoin(roomData.data.data.name));
                dispatch(roomEnd());
            } else {
                dispatch(roomError(response.data.msg));
            }
        } catch (error) {
            dispatch(roomError(error));
        }
    };
};

export const roomLeaveExisting = roomDeleted => {
    return async (dispatch, getState) => {
        dispatch(roomInitiate());
        const payload = {
            roomName: getState().room.name,
            username: getState().auth.username
        };

        if (roomDeleted) {
            dispatch(roomDelete());
            dispatch(roomLeave(getState().auth.username));
            dispatch(roomEnd());
        } else {
            try {
                const response = await axios
                    .getInstance()
                    .post(roomLeaveRoute, payload);

                if (response.data.success) {
                    await dispatch(roomGetAll());
                    dispatch(roomLeave(getState().auth.username));
                    dispatch(roomEnd());
                } else {
                    dispatch(roomError(response.data.msg));
                }
            } catch (error) {
                dispatch(roomError(error));
            }
        }
    };
};

export const roomDeleteExisting = () => {
    return async (dispatch, getState) => {
        dispatch(roomInitiate());
        const roomId = getState().room["_id"];
        const username = getState().auth.username;

        try {
            const response = await axios
                .getInstance()
                .delete(roomDeleteRoute(roomId));

            if (response.data.success) {
                await dispatch(roomGetAll());
                dispatch(roomDelete());
                dispatch(roomLeave(username));
                dispatch(roomEnd());
            } else {
                dispatch(roomError(response.data.msg));
            }
        } catch (error) {
            dispatch(roomError(error));
        }
    };
};

export const roomGetGraph = name => {
    return async dispatch => {
        let response;

        try {
            response = await axios.getInstance().get(roomGetGraphRoute(name));

            if (response.data.success) {
                dispatch(roomGraph(response.data.data));
            } else {
                dispatch(roomError(response.data.msg));
            }
        } catch (error) {
            dispatch(roomError(error));
        }

        return response;
    };
};

export const roomChangeGraph = (name, graph) => {
    return async dispatch => {
        let response;
        const payload = {
            graph: graph
        };

        try {
            response = await axios
                .getInstance()
                .put(roomChangeGraphRoute(name), payload);

            if (response.data.success) {
                dispatch(roomGraphChange(graph));
            } else {
                dispatch(roomError(response.data.msg));
            }
        } catch (error) {
            dispatch(roomError(error));
        }

        return response;
    };
};
