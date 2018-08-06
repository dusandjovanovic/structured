import * as actionTypes from './actions';
import axios from '../../utils/axios-handler';
import {friendFail, friendRequests, userData} from "./user";

export const roomCreate = (name) => {
    return {
        type: actionTypes.ROOM_CREATE,
        name: name
    }
};

export const roomDelete = (name) => {
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
        let url = '/api/rooms/' + mode;
        axios.get(url)
            .then(response => {
                if (response.data.success) {
                    console.log('roomData:', response);
                    dispatch(roomAll(response.data.data));
                }
                else {
                    console.log('roomError:', response.data.error);
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
        const data = {
            name: name,
            maxUsers: maxUsers,
            createdBy: username
        };
        let url = '/api/rooms';
        axios.post(url, data)
            .then(response => {
                console.log('roomCreateData:', response);
                dispatch(roomCreate(name));
                dispatch(roomGetAll('all'));
            })
            .catch(error => {
                console.log('roomCreateError:', error);
                dispatch(roomError(error));
            });
    }
};

export const roomJoinExisting = (name, username) => {
    return dispatch => {
        const data = {
            name: name,
            username: username
        };
        let url = '/api/rooms/join';
        axios.post(url, data)
            .then(response => {
                console.log('roomJoinData:', response);
                dispatch(roomJoin(name));
            })
            .catch(error => {
                console.log('roomJoinError:', error);
                dispatch(roomError(error));
            });
    }
};

export const roomLeaveExisting = (name, username) => {
    return dispatch => {
        const data = {
            name: name,
            username: username
        };
        let url = '/api/rooms/leave';
        axios.post(url, data)
            .then(response => {
                console.log('roomLeaveData:', response);
                dispatch(roomLeave());
            })
            .catch(error => {
                console.log('roomLeaveError:', error);
                dispatch(roomError(error));
            });
    }
};

export const roomDeleteCurrent = (roomId) => {
    return dispatch => {
        let url = '/api/rooms/' + roomId;
        axios.delete(url)
            .then(response => {
                console.log('deleteRoom:', response);
                dispatch(userData(username));
                dispatch(friendRequests(username));
            })
            .catch(error => {
                console.log('deleteError:', error);
                dispatch(roomError(error));
            });
    }
};