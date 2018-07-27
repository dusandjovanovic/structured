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

export const userData = (username) => {
    return dispatch => {
        let url = '/api/user/:' + username;
        axios.get(url)
            .then(response => {
                console.log('userData:', response);
                let received = ["Friend 123", "Friend 122", "Friend 255", "Friend 111"];
                for (let element in response.data)
                    received.push(element);
                dispatch(userFetchData(username, received));
            })
            .catch((error) => {
                console.log('userError:', error);
                dispatch(userFetchDataFail("Fetching social data failed."));
            });
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
                console.log('requestError:', error);
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
                console.log('addData:', response);
            })
            .catch(error => {
                console.log('addError:', error);
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
                console.log('confirmData', response);
            })
            .catch(error => {
                console.log('confirmError:', error);
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
                console.log('deleteData:', response);
            })
            .catch(error => {
                console.log('deleteError:', error);
                dispatch(friendFail("Fetching social data failed."));
            });
    }
};