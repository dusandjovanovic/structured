import * as actionTypes from './actions';
import axios from '../../util/axiosHandler';

export const userFetchData = (username, friends) => {
    return {
        type: actionTypes.USER_FETCH_DATA,
        username: username,
        friends: friends
    }
};

export const userFetchDataFail = (error) => {
    return {
        type: actionTypes.USER_FETCH_DATA_FAIL,
        error: error
    }
};

export const friendFail = (error) => {
    return {
        type: actionTypes.USER_FETCH_DATA_FAIL,
        error: error
    }
};

export const friendRequests = (username) => {
    return dispatch => {
        let url = '/api/friend-request/:' + username;
        axios.get(url)
            .then(response => {
                console.log('requestsData:', response);
            })
            .catch(error => {
                console.log('Requests-message: ', error);
                dispatch(friendFail("Fetching social data failed."));
            });
    }
};

export const friendAdd = (username, friendUsername) => {
    return dispatch => {
        const data = {
            sender: username,
            receiver: friendUsername
        };
        let url = '/api/friend-request/add';
        axios.post(url, data)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log('Add-message: ', error);
                dispatch(friendFail("Fetching social data failed."));
            });
    }
};

export const friendConfirm = (requestId) => {
    return dispatch => {
        const data = {
            id: requestId
        };
        let url = '/api/friend-request/confirm';
        axios.post(url, data)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log('Confirm-message: ', error);
                dispatch(friendFail("Fetching social data failed."));
            });
    }
};

export const friendDelete = (requestId) => {
    return dispatch => {
        const data = {
            id: requestId
        };
        let url = '/api/friend-request/delete';
        axios.delete(url, data)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log('Delete-message: ', error);
                dispatch(friendFail("Fetching social data failed."));
            });
    }
};

export const user = (username) => {
    return dispatch => {
        let url = '/api/user/:' + username;
        axios.get(url)
            .then(response => {
                console.log('userData:', response);
                //dispatch(userFetchData());
            })
            .catch((error) => {
                console.log('User-message: ', error);
                dispatch(userFetchDataFail("Fetching social data failed."));
            });
    }
};

