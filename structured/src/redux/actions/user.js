import * as actionTypes from './actions';
import axios from '../../util/axiosHandler';
import * as actions from './index';

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
        let url = '/api/user/' + username;
        axios.get(url)
            .then(response => {
                console.log('userData:', response);
                let friends = [];
                console.log(response.data.friends);
                for (let element in response.data.friends)
                    friends.push(response.data.friends[element]);
                dispatch(userFetchData(username, friends));
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

export const friendRequestsFetch = (requests) => {
    return {
        type: actionTypes.FRIENDS_FETCH_REQUESTS,
        requests: requests
    }
};

export const friendRequests = (username) => {
    return dispatch => {
        let url = '/api/friend-request/' + username;
        axios.get(url)
            .then(response => {
                console.log('requestsData:', response);
                let received = [];
                for (let request in response.data) {
                    received.push({...response.data[request]});
                    let sender = response.data[request].sender;
                    let requestId = response.data[request]._id;
                    dispatch(actions.notificationSystem(
                        'You have a new friend request from ' + sender + '. Click Accept to become friends or dismiss.',
                        'info',
                        10,
                        {
                            label: 'Accept',
                            callback: function() {
                                dispatch(friendConfirm(requestId, username));
                                dispatch(userData(username));
                            }
                        },
                        null
                    ));
                }
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
                if (response.data.success)
                    dispatch(actions.notificationSystem(
                        'Friend request sent to ' + friendUsername + '.',
                        'success',
                        10,
                        null,
                        null
                    ));
                else
                    dispatch(actions.notificationSystem(
                        'Username does not exist.',
                        'error',
                        10,
                        null,
                        null
                    ));
            })
            .catch(error => {
                console.log('addError:', error);
                dispatch(friendFail("Fetching social data failed."));
            });
    }
};

export const friendConfirm = (requestId, username) => {
    return dispatch => {
        const data = {
            id: requestId
        };
        let url = '/api/friend-request/confirm';
        axios.post(url, data)
            .then(response => {
                console.log('confirmData:', response);
            })
            .catch(error => {
                console.log('confirmError:', error);
                dispatch(friendFail("Fetching social data failed."));
                dispatch(userData(username));
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