import * as actionTypes from './actions';
import axios from '../../utils/axios-handler';
import * as actions from './index';

export const userFetchData = (username, friends) => {
    return {
        type: actionTypes.USER_FETCH_DATA,
        username: username,
        friends: friends
    }
};

export const userFetchAllData = (userData) => {
    return {
        type: actionTypes.USER_FETCH_ALL_DATA,
        userData: userData
    }
};

export const userFetchDataStart = () => {
    return {
        type: actionTypes.USER_FETCH_DATA_START
    }
};

export const userFetchDataEnd = () => {
    return {
        type: actionTypes.USER_FETCH_DATA_END
    }
};

export const userFetchDataFail = (error) => {
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

export const friendFail = (error) => {
    return {
        type: actionTypes.USER_FETCH_DATA_FAIL,
        error: error
    }
};

export const userData = (username) => {
    return dispatch => {
        dispatch(userFetchDataStart());
        let url = '/api/user/' + username;
        axios.get(url)
            .then(response => {
                if (response.data.success) {
                    let friends = [];
                    for (let element in response.data.data.friends)
                        friends.push(response.data.data.friends[element]);
                    dispatch(userFetchData(username, friends));
                    dispatch(userFetchDataEnd());
                }
                else {
                    console.log('userError:', response.data.error);
                    dispatch(userFetchDataFail(response.data.error));
                }
            })
            .catch((error) => {
                console.log('userError:', error);
                dispatch(actions.notificationSystem(error.message, 'error', 10, null, null));
                dispatch(userFetchDataFail(error.message));
            });
    }
};

export const userDataAll = (username) => {
    return dispatch => {
        if (!username) {
            dispatch(userFetchAllData(null));
        }
        else {
            dispatch(userFetchDataStart());
            let url = '/api/user/' + username;
            return new Promise(function(resolve, reject) {
                axios.get(url)
                    .then(response => {
                        if (response.data.success) {
                            dispatch(userFetchAllData(response.data.data.userData));
                            dispatch(userFetchDataEnd());
                            resolve(response.data);
                        }
                        else {
                            console.log('userError:', response.data.error);
                            dispatch(userFetchDataFail(response.data.error));
                            reject(response.data.error);
                        }
                    })
                    .catch((error) => {
                        console.log('userError:', error);
                        dispatch(actions.notificationSystem(error.message, 'error', 10, null, null));
                        dispatch(userFetchDataFail(error.message));
                        reject(error.message);
                    });
            });
        }
    }
};

export const friendRequests = (username, push) => {
    return dispatch => {
        let url = '/api/friend-request/' + username;
        axios.get(url)
            .then(response => {
                if (response.data.success) {
                    let received = [];
                    for (let request in response.data.data) {
                        const id = response.data.data[request]._id;
                        const receiver = response.data.data[request].receiver;
                        const sender = response.data.data[request].sender;
                        const requestId = response.data.data[request]._id;
                        const time = response.data.data[request].time;
                        received.push({
                            id: id,
                            receiver: receiver,
                            sender: sender,
                            time: time
                        });
                        if (push)
                            dispatch(actions.notificationSystem(
                                'You have a new friend request from ' + sender + '. Click Accept to become friends or dismiss.',
                                'info',
                                10,
                                {
                                    label: 'Accept',
                                    callback: function () {
                                        dispatch(friendConfirm(requestId, username));
                                        dispatch(userData(username));
                                    }
                                },
                                null
                            ));
                    }
                    dispatch(friendRequestsFetch(received));
                }
                else {
                    console.log('requestsError:', response.data.msg);
                    dispatch(friendFail(response.data.msg));
                }
            })
            .catch(error => {
                console.log('requestError:', error);
                dispatch(actions.notificationSystem(error.message, 'error', 10, null, null));
                dispatch(friendFail(error.message));
            });
    }
};

export const friendAdd = (username, friendUsername) => {
    return dispatch => {
        const data = {
            sender: username,
            receiver: friendUsername
        };

        let url = '/api/friend-request/check';
        axios.post(url, data)
            .then(response => {
                if (response.data.data.exists) {
                    dispatch(actions.notificationSystem(
                        'You have already sent a friend request to that person. Please wait for a response.',
                        'error',
                        10,
                        null,
                        null
                    ));
                }
                else {
                    url = '/api/friend-request/add';
                    axios.post(url, data)
                        .then(response => {
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
                                    'Username does not exist. Please try again.',
                                    'error',
                                    10,
                                    null,
                                    null
                                ));
                        })
                        .catch(error => {
                            console.log('addError:', error);
                            dispatch(friendFail("Fetching dashboard data failed."));
                        });
                }
            })
            .catch(error => {
                console.log('addError:', error);
                dispatch(actions.notificationSystem(error.message, 'error', 10, null, null));
                dispatch(friendFail(error.message));
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
                dispatch(userData(username));
                dispatch(friendRequests(username, false));
            })
            .catch(error => {
                console.log('confirmError:', error);
                dispatch(actions.notificationSystem(error.message, 'error', 10, null, null));
                dispatch(friendFail(error.message));
            });
    }
};

export const friendDelete = (requestId, username) => {
    return dispatch => {
        let url = '/api/friend-request/' + requestId;
        axios.delete(url)
            .then(response => {
                dispatch(userData(username));
                dispatch(friendRequests(username, false));
            })
            .catch(error => {
                console.log('deleteError:', error);
                dispatch(actions.notificationSystem(error.message, 'error', 10, null, null));
                dispatch(friendFail(error.message));
            });
    }
};

export const userCompeteScore = (username, score) => {
    return dispatch => {
        const data = {
            username: username,
            score: score
        };
        let url = '/api/user/' + username;
        axios.post(url, data)
            .then(response => {
                if (response.data.success) {
                    dispatch(actions.notificationSystem("Your solution was successfully submitted. With the overall score of " + score + ".", "success", 10, null, null));
                }
                else {
                    console.log('roomLeaveError:', response.data.msg);
                    dispatch(actions.notificationSystem(response.data.msg, 'error', 10, null, null));
                    dispatch(userFetchDataFail(response.data.msg));
                }
            })
            .catch(error => {
                console.log('roomLeaveError:', error);
                dispatch(actions.notificationSystem(error.message, 'error', 10, null, null));
                dispatch(userFetchDataFail(error.message));
            });
    }
};