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

const roomLeave = () => {
    return {
        type: ROOM_LEAVE
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
    return dispatch => {
        dispatch(roomInitiate());

        axios
            .getInstance()
            .get(roomGetAllRoute(mode))
            .then(response => {
                if (response.data.success) {
                    dispatch(roomAll(response.data.data));
                    dispatch(roomEnd());
                } else {
                    console.log("roomError:", response.data.msg);
                    dispatch(roomError(response.data.msg));
                }
            })
            .catch(error => {
                console.log("roomError:", error);
                dispatch(roomError(error));
            });
    };
};

export const roomGetData = name => {
    return (dispatch, getState) => {
        dispatch(roomInitiate());

        axios
            .getInstance()
            .get(roomGetDataRoute(name))
            .then(response => {
                if (response.data.success) {
                    dispatch(
                        roomData(
                            response.data.data,
                            getState().auth.username ===
                                response.data.data.createdBy
                        )
                    );
                } else {
                    console.log("roomError:", response.data.msg);
                    dispatch(roomError(response.data.msg));
                }
            })
            .catch(error => {
                console.log("roomError:", error);
                dispatch(roomError(error));
            });
    };
};

export const roomCreateNew = (name, maxUsers, roomType) => {
    return (dispatch, getState) => {
        dispatch(roomInitiate());

        const data = {
            name: name,
            maxUsers: maxUsers,
            roomType: roomType,
            createdBy: getState().auth.username
        };

        axios
            .getInstance()
            .post(roomCreateNewRoute, data)
            .then(response => {
                if (response.data.success) {
                    dispatch(roomCreate(name));
                    dispatch(roomGetData(name));
                    dispatch(roomGetAll("all"));
                } else {
                    console.log("roomCreateError:", response.data.msg);
                    dispatch(roomError(response.data.msg));
                }
            })
            .catch(error => {
                console.log("roomCreateError:", error);
                dispatch(roomError(error));
            });
    };
};

export const roomJoinExisting = name => {
    return (dispatch, getState) => {
        dispatch(roomInitiate());

        const data = {
            roomName: name,
            username: getState().auth.username
        };

        return new Promise(function(resolve, reject) {
            axios
                .getInstance()
                .post(roomJoinRoute, data)
                .then(response => {
                    if (response.data.success) {
                        dispatch(roomGetData(name));
                        dispatch(roomJoin(name));
                        dispatch(roomGetAll("all"));
                        resolve(response.data);
                    } else {
                        console.log("roomJoinError:", response.data.msg);
                        dispatch(roomError(response.data.msg));
                        reject(response.data.msg);
                    }
                })
                .catch(error => {
                    console.log("roomJoinError:", error);
                    dispatch(roomError(error));
                    reject(error.message);
                });
        });
    };
};

export const roomLeaveExisting = (name, roomDeleted) => {
    return (dispatch, getState) => {
        dispatch(roomInitiate());

        const data = {
            roomName: name,
            username: getState().auth.username
        };

        if (roomDeleted) {
            dispatch(roomLeave());
            dispatch(roomGetAll("all"));
        } else
            return new Promise(function(resolve, reject) {
                axios
                    .getInstance()
                    .post(roomLeaveRoute, data)
                    .then(response => {
                        if (response.data.success) {
                            dispatch(roomLeave());
                            dispatch(roomGetAll("all"));
                            resolve(response.data);
                        } else {
                            console.log("roomLeaveError:", response.data.msg);
                            dispatch(roomError(response.data.msg));
                            reject(response.data.msg);
                        }
                    })
                    .catch(error => {
                        console.log("roomLeaveError:", error);
                        dispatch(roomError(error));
                        reject(error.message);
                    });
            });
    };
};

export const roomDeleteExisting = roomId => {
    return dispatch => {
        dispatch(roomInitiate());

        return new Promise(function(resolve, reject) {
            axios
                .getInstance()
                .delete(roomDeleteRoute(roomId))
                .then(response => {
                    if (response.data.success) {
                        dispatch(roomDelete());
                        dispatch(roomGetAll("all"));
                        resolve(response.data);
                    } else {
                        console.log("roomDeleteError:", response.data.msg);
                        dispatch(roomError(response.data.msg));
                        reject(response.data.msg);
                    }
                })
                .catch(error => {
                    console.log("deleteError:", error);
                    dispatch(roomError(error));
                    reject(error.message);
                });
        });
    };
};

export const roomGetGraph = name => {
    return dispatch => {
        dispatch(roomInitiate());

        return new Promise(function(resolve, reject) {
            axios
                .getInstance()
                .get(roomGetGraphRoute(name))
                .then(response => {
                    if (response.data.success) {
                        dispatch(roomGraph(response.data.data));
                        dispatch(roomEnd());
                        resolve(response.data);
                    } else {
                        console.log("roomError:", response.data.msg);
                        dispatch(roomError(response.data.msg));
                        reject(response.data.msg);
                    }
                })
                .catch(error => {
                    console.log("roomError:", error);
                    dispatch(roomError(error));
                    reject(error.message);
                });
        });
    };
};

export const roomChangeGraph = (name, graph) => {
    return dispatch => {
        dispatch(roomInitiate());

        let data = {
            graph: graph
        };

        return new Promise(function(resolve, reject) {
            axios
                .getInstance()
                .put(roomChangeGraphRoute(name), data)
                .then(response => {
                    if (response.data.success) {
                        dispatch(roomGraphChange(graph));
                        dispatch(roomEnd());
                        resolve(response.data);
                    } else {
                        console.log("roomError:", response.data.msg);
                        dispatch(roomError(response.data.msg));
                        reject(response.data.msg);
                    }
                })
                .catch(error => {
                    console.log("roomError:", error);
                    dispatch(roomError(error));
                    reject(error.message);
                });
        });
    };
};
