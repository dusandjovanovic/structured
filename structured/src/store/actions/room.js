import * as actionTypes from "../actions.js";
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
import * as actions from "./index";

export const roomCreate = name => {
    return {
        type: actionTypes.ROOM_CREATE,
        name: name
    };
};

export const roomDelete = () => {
    return {
        type: actionTypes.ROOM_DELETE
    };
};

export const roomJoin = name => {
    return {
        type: actionTypes.ROOM_JOIN,
        name: name
    };
};

export const roomLeave = () => {
    return {
        type: actionTypes.ROOM_LEAVE
    };
};

export const roomInitiate = () => {
    return {
        type: actionTypes.ROOM_START
    };
};

export const roomEnd = () => {
    return {
        type: actionTypes.ROOM_END
    };
};

export const roomData = (data, master) => {
    return {
        type: actionTypes.ROOM_DATA,
        master: master,
        data: data
    };
};

export const roomAll = rooms => {
    return {
        type: actionTypes.ROOM_ALL,
        rooms: rooms
    };
};

export const roomGraph = graph => {
    return {
        type: actionTypes.ROOM_GRAPH,
        graph: graph
    };
};

export const roomGraphChange = graph => {
    return {
        type: actionTypes.ROOM_GRAPH_CHANGE,
        graph: graph
    };
};

export const roomError = error => {
    return {
        type: actionTypes.ROOM_ERROR,
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

export const roomGetData = (name, username) => {
    return dispatch => {
        dispatch(roomInitiate());

        axios
            .getInstance()
            .get(roomGetDataRoute(name))
            .then(response => {
                if (response.data.success) {
                    dispatch(
                        roomData(
                            response.data.data,
                            username === response.data.data.createdBy
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

export const roomCreateNew = (name, maxUsers, roomType, username) => {
    return dispatch => {
        dispatch(roomInitiate());

        const data = {
            name: name,
            maxUsers: maxUsers,
            roomType: roomType,
            createdBy: username
        };

        axios
            .getInstance()
            .post(roomCreateNewRoute, data)
            .then(response => {
                if (response.data.success) {
                    dispatch(roomCreate(name));
                    dispatch(roomGetData(name, username));
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

export const roomJoinExisting = (name, username) => {
    return dispatch => {
        dispatch(roomInitiate());

        const data = {
            roomName: name,
            username: username
        };

        return new Promise(function(resolve, reject) {
            axios
                .getInstance()
                .post(roomJoinRoute, data)
                .then(response => {
                    if (response.data.success) {
                        dispatch(roomGetData(name, username));
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

export const roomLeaveExisting = (name, username, roomDeleted) => {
    return dispatch => {
        dispatch(roomInitiate());

        const data = {
            roomName: name,
            username: username
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
