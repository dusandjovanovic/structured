import * as actionTypes from './actions';
import axios from '../../utils/axios-handler';
import {friendFail, friendRequests, userData} from "./user";

export const roomCreate = (name) => {
    return {
        type: actionTypes.ROOM_CREATE,
        name: name
    }
};

export const roomJoin = (name) => {
    return {
        type: actionTypes.ROOM_JOIN,
        name: name
    }
};

export const roomAll = (rooms) => {
    return {
        type: actionTypes.ROOM_ALL,
        rooms: rooms
    }
};

export const roomExit = () => {
    return {
        type: actionTypes.ROOM_EXIT
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

export const roomCreateNew = (name, maxUsers) => {
    return dispatch => {
        const data = {
            name: name,
            maxUsers: maxUsers
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