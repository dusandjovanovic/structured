import * as actionTypes from './actions';
import axios from '../../utils/axios-handler';

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
                    dispatch(roomError(response.data.msg));
                    dispatch(roomEnd());
                }
            })
            .catch((error) => {
                console.log('roomError:', error);
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
                    dispatch(roomError(response.data.msg));
                }
            })
            .catch((error) => {
                console.log('roomError:', error);
                dispatch(roomError(error));
            });
    }
};

export const roomCreateNew = (name, maxUsers, username) => {
    return dispatch => {
        dispatch(roomInitiate());
        const data = {
            name: name,
            maxUsers: maxUsers,
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
                    dispatch(roomError(response.data.msg));
                }
            })
            .catch(error => {
                console.log('roomCreateError:', error);
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
        let url = '/api/rooms/join';
        axios.post(url, data)
            .then(response => {
                if (response.data.success) {
                    dispatch(roomGetData(name, username));
                    dispatch(roomJoin(name));
                    dispatch(roomGetAll('all'));
                }
                else {
                    console.log('roomJoinError:', response.data.msg);
                    dispatch(roomError(response.data.msg));
                }
            })
            .catch(error => {
                console.log('roomJoinError:', error);
                dispatch(roomError(error));
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
        let url = '/api/rooms/leave';
        axios.post(url, data)
            .then(response => {
                if (response.data.success) {
                    dispatch(roomLeave());
                    dispatch(roomGetAll('all'));
                }
                else {
                    console.log('roomLeaveError:', response.data.msg);
                    dispatch(roomError(response.data.msg));
                }
            })
            .catch(error => {
                console.log('roomLeaveError:', error);
                dispatch(roomError(error));
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
                    dispatch(roomError(response.data.msg));
                }
            })
            .catch(error => {
                console.log('deleteError:', error);
                dispatch(roomError(error));
            });
    }
};