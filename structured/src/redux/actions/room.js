import * as actionTypes from './actions';
import axios from '../../utils/axios-handler';
import * as actions from './index';

export const roomCreate = (name) => {
    return {
        type: actionTypes.ROOM_CREATE,
        name: name
    }
};

export const roomDelete = () => {
    return {
        type: actionTypes.ROOM_DELETE
    }
};

export const roomJoin = (name) => {
    return {
        type: actionTypes.ROOM_JOIN,
        name: name
    }
};

export const roomLeave = () => {
    return {
        type: actionTypes.ROOM_LEAVE
    }
};

export const roomInitiate = () => {
    return {
        type: actionTypes.ROOM_START
    }
};

export const roomEnd = () => {
    return {
        type: actionTypes.ROOM_END
    }
};

export const roomData = (data, master) => {
    return {
        type: actionTypes.ROOM_DATA,
        master: master,
        data: data
    }
};

export const roomAll = (rooms) => {
    return {
        type: actionTypes.ROOM_ALL,
        rooms: rooms
    }
};

export const roomGraph = (graph) => {
    return {
        type: actionTypes.ROOM_GRAPH,
        graph: graph
    }
};

export const roomGraphChange = (graph) => {
    return {
        type: actionTypes.ROOM_GRAPH_CHANGE,
        graph: graph
    }
};

export const roomError = (error) => {
    return {
        type:actionTypes.ROOM_ERROR,
        error: error
    }
};

export const roomGetAll = (mode) => {
    return dispatch => {
        dispatch(roomInitiate());
        let url = '/api/rooms/' + mode;
        axios.get(url)
            .then(response => {
                if (response.data.success) {
                    dispatch(roomAll(response.data.data));
                    dispatch(roomEnd());
                }
                else {
                    console.log('roomError:', response.data.msg);
                    dispatch(actions.notificationSystem(response.data.msg, 'error', 10, null, null));
                    dispatch(roomError(response.data.msg));
                }
            })
            .catch((error) => {
                console.log('roomError:', error);
                dispatch(actions.notificationSystem(error.message, 'error', 10, null, null));
                dispatch(roomError(error));
            });
    }
};

export const roomGetData = (name, username) => {
    return dispatch => {
        dispatch(roomInitiate());
        let url = '/api/rooms/get/' + name;
        axios.get(url)
            .then(response => {
                if (response.data.success) {
                    dispatch(roomData(response.data.data, (username === response.data.data.createdBy)));
                }
                else {
                    console.log('roomError:', response.data.msg);
                    dispatch(actions.notificationSystem(response.data.msg, 'error', 10, null, null));
                    dispatch(roomError(response.data.msg));
                }
            })
            .catch((error) => {
                console.log('roomError:', error);
                dispatch(actions.notificationSystem(error.message, 'error', 10, null, null));
                dispatch(roomError(error));
            });
    }
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
        let url = '/api/rooms';
        axios.post(url, data)
            .then(response => {
                if (response.data.success) {
                    dispatch(roomCreate(name));
                    dispatch(roomGetData(name, username));
                    dispatch(roomGetAll('all'));
                }
                else {
                    console.log('roomCreateError:', response.data.msg);
                    dispatch(actions.notificationSystem(response.data.msg, 'error', 10, null, null));
                    dispatch(roomError(response.data.msg));
                }
            })
            .catch(error => {
                console.log('roomCreateError:', error);
                dispatch(actions.notificationSystem(error.message, 'error', 10, null, null));
                dispatch(roomError(error));
            });
    }
};

export const roomJoinExisting = (name, username) => {
    return dispatch => {
        dispatch(roomInitiate());
        const data = {
            roomName: name,
            username: username
        };
        return new Promise(function(resolve, reject) {
            let url = '/api/rooms/join';
            axios.post(url, data)
                .then(response => {
                    if (response.data.success) {
                        resolve({
                            msg: response.data.msg,
                            master: response.data.newMaster
                        });
                        dispatch(roomGetData(name, username));
                        dispatch(roomJoin(name));
                        dispatch(roomGetAll('all'));
                    }
                    else {
                        console.log('roomJoinError:', response.data.msg);
                        dispatch(actions.notificationSystem(response.data.msg, 'error', 10, null, null));
                        dispatch(roomError(response.data.msg));
                        reject(response.data.msg);
                    }
                })
                .catch(error => {
                    console.log('roomJoinError:', error);
                    dispatch(actions.notificationSystem(error.message, 'error', 10, null, null));
                    dispatch(roomError(error));
                    reject(error.message);
                });
        });
    }
};

export const roomLeaveExisting = (name, username) => {
    return dispatch => {
        dispatch(roomInitiate());
        const data = {
            roomName: name,
            username: username
        };
        return new Promise(function(resolve, reject) {
            let url = '/api/rooms/leave';
            axios.post(url, data)
                .then(response => {
                    if (response.data.success) {
                        resolve({
                            msg: response.data.msg,
                            master: response.data.newMaster
                        });
                        dispatch(roomLeave());
                        dispatch(roomGetAll('all'));
                    }
                    else {
                        console.log('roomLeaveError:', response.data.msg);
                        dispatch(actions.notificationSystem(response.data.msg, 'error', 10, null, null));
                        dispatch(roomError(response.data.msg));
                        reject(response.data.msg);
                    }
                })
                .catch(error => {
                    console.log('roomLeaveError:', error);
                    dispatch(actions.notificationSystem(error.message, 'error', 10, null, null));
                    dispatch(roomError(error));
                    reject(error.message);
                });
        });
    }
};

export const roomDeleteExisting = (roomId) => {
    return dispatch => {
        dispatch(roomInitiate());
        let url = '/api/rooms/' + roomId;
        axios.delete(url)
            .then(response => {
                if (response.data.success) {
                    dispatch(roomDelete());
                    dispatch(roomGetAll('all'));
                }
                else {
                    console.log('roomDeleteError:', response.data.msg);
                    dispatch(actions.notificationSystem(response.data.msg, 'error', 10, null, null));
                    dispatch(roomError(response.data.msg));
                }
            })
            .catch(error => {
                console.log('deleteError:', error);
                dispatch(actions.notificationSystem(error.message, 'error', 10, null, null));
                dispatch(roomError(error));
            });
    }
};

export const roomGetGraph = (name) => {
    return dispatch => {
        dispatch(roomInitiate());
        let url = '/api/rooms/get-graph/' + name;

        return new Promise(function(resolve, reject) {
            axios.get(url)
                .then(response => {
                    if (response.data.success) {
                        dispatch(roomGraph(response.data.data));
                        dispatch(roomEnd());
                        resolve(response.data);
                    }
                    else {
                        console.log('roomError:', response.data.msg);
                        dispatch(actions.notificationSystem(response.data.msg, 'error', 10, null, null));
                        dispatch(roomError(response.data.msg));
                        reject(response.data.msg);
                    }
                })
                .catch((error) => {
                    console.log('roomError:', error);
                    dispatch(actions.notificationSystem(error.message, 'error', 10, null, null));
                    dispatch(roomError(error));
                    reject(error.message);
                });
        });
    }
};

export const roomChangeGraph = (name, graph) => {
    return dispatch => {
        dispatch(roomInitiate());
        let url = '/api/rooms/' + name;
        let data = {
            graph: graph
        };

        return new Promise(function(resolve, reject) {
            axios.put(url, data)
                .then(response => {
                    if (response.data.success) {
                        dispatch(roomGraphChange(graph));
                        dispatch(roomEnd());
                        resolve(response.data);
                    }
                    else {
                        console.log('roomError:', response.data.msg);
                        dispatch(actions.notificationSystem(response.data.msg, 'error', 10, null, null));
                        dispatch(roomError(response.data.msg));
                        reject(response.data.msg);
                    }
                })
                .catch((error) => {
                    console.log('roomError:', error);
                    dispatch(actions.notificationSystem(error.message, 'error', 10, null, null));
                    dispatch(roomError(error));
                    reject(error.message);
                });
        })
    }
};