import * as actionTypes from "../actions.js";
import {
    axios,
    userGetDataRoute,
    userGetHistoryRoute,
    userGetFriendRequestsRoute,
    userAddHistoryRoute,
    userFriendCheckRoute,
    userFriendAddRoute,
    userFriendConfirmRoute,
    userFriendDeleteRoute
} from "../../utils/api";
import * as actions from "./index";

export const userFetchData = (username, friends) => {
    return {
        type: actionTypes.USER_FETCH_DATA,
        username: username,
        friends: friends
    };
};

export const userFetchHistory = userData => {
    return {
        type: actionTypes.USER_FETCH_HISTORY,
        history: userData
    };
};

export const userFetchDataStart = () => {
    return {
        type: actionTypes.USER_FETCH_DATA_START
    };
};

export const userFetchDataEnd = () => {
    return {
        type: actionTypes.USER_FETCH_DATA_END
    };
};

export const userFetchDataFail = error => {
    return {
        type: actionTypes.USER_FETCH_DATA_FAIL,
        error: error
    };
};

export const friendRequestsFetch = requests => {
    return {
        type: actionTypes.FRIENDS_FETCH_REQUESTS,
        requests: requests
    };
};

export const friendFail = error => {
    return {
        type: actionTypes.USER_FETCH_DATA_FAIL,
        error: error
    };
};

export const userData = username => {
    return dispatch => {
        dispatch(userFetchDataStart());

        axios
            .getInstance()
            .get(userGetDataRoute(username))
            .then(response => {
                if (response.data.success) {
                    let friends = [];
                    for (let element in response.data.data.friends)
                        friends.push(response.data.data.friends[element]);
                    dispatch(userFetchData(username, friends));
                    dispatch(userFetchDataEnd());
                } else {
                    console.log("userError:", response.data.error);
                    dispatch(userFetchDataFail(response.data.error));
                }
            })
            .catch(error => {
                console.log("userError:", error);
                dispatch(userFetchDataFail(error.message));
            });
    };
};

export const userHistory = username => {
    return dispatch => {
        dispatch(userFetchDataStart());

        axios
            .getInstance()
            .get(userGetHistoryRoute(username))
            .then(response => {
                if (response.data.success) {
                    dispatch(userFetchHistory(response.data.data));
                    dispatch(userFetchDataEnd());
                } else {
                    console.log("userError:", response.data.error);
                    dispatch(userFetchDataFail(response.data.error));
                }
            })
            .catch(error => {
                console.log("userError:", error);
                dispatch(userFetchDataFail(error.message));
            });
    };
};

export const userHistoryAdd = (username, score) => {
    return dispatch => {
        const data = {
            score: score
        };

        axios
            .getInstance()
            .put(userAddHistoryRoute(username), data)
            .then(response => {
                if (response.data.success) {
                    dispatch(
                        actions.internalNotificationsAdd(
                            "Your solution was successfully submitted. You can see it in your history on dashboard.",
                            "success"
                        )
                    );
                } else {
                    console.log("roomLeaveError:", response.data.msg);
                    dispatch(userFetchDataFail(response.data.msg));
                }
            })
            .catch(error => {
                console.log("roomLeaveError:", error);
                dispatch(userFetchDataFail(error.message));
            });
    };
};

export const friendRequests = (username, push) => {
    return dispatch => {
        axios
            .getInstance()
            .get(userGetFriendRequestsRoute(username))
            .then(response => {
                if (response.data.success) {
                    if (push)
                        response.data.data.map(element => {
                            dispatch(
                                actions.internalNotificationsAdd(
                                    "You have a new friend request from " +
                                        element.sender,
                                    "success"
                                )
                            );
                        });
                    dispatch(friendRequestsFetch(response.data.data));
                } else {
                    console.log("requestsError:", response.data.msg);
                    dispatch(friendFail(response.data.msg));
                }
            })
            .catch(error => {
                console.log("requestError:", error);
                dispatch(friendFail(error.message));
            });
    };
};

export const friendAdd = friendUsername => {
    return (dispatch, getState) => {
        const data = {
            sender: getState().user.username,
            receiver: friendUsername
        };

        axios
            .getInstance()
            .post(userFriendCheckRoute, data)
            .then(response => {
                if (response.data.data.exists) {
                    dispatch(
                        actions.internalNotificationsAdd(
                            "You have already sent a friend request to that person. Please wait for a response.",
                            "warning"
                        )
                    );
                } else {
                    axios
                        .getInstance()
                        .post(userFriendAddRoute, data)
                        .then(response => {
                            if (response.data.success)
                                dispatch(
                                    actions.internalNotificationsAdd(
                                        "Friend request sent to " +
                                            friendUsername +
                                            ".",
                                        "success"
                                    )
                                );
                            else
                                dispatch(
                                    actions.internalNotificationsAdd(
                                        "Username does not exist. Please try again.",
                                        "warning"
                                    )
                                );
                        })
                        .catch(error => {
                            console.log("addError:", error);
                            dispatch(
                                friendFail("Fetching dashboard data failed.")
                            );
                        });
                }
            })
            .catch(error => {
                console.log("addError:", error);
                dispatch(friendFail(error.message));
            });
    };
};

export const friendConfirm = requestId => {
    return (dispatch, getState) => {
        const data = {
            id: requestId
        };

        axios
            .getInstance()
            .post(userFriendConfirmRoute, data)
            .then(response => {
                dispatch(userData(getState().user.username));
                dispatch(friendRequests(getState().user.username, false));
            })
            .catch(error => {
                console.log("confirmError:", error);
                dispatch(friendFail(error.message));
            });
    };
};

export const friendDelete = requestId => {
    return (dispatch, getState) => {
        axios
            .getInstance()
            .delete(userFriendDeleteRoute(requestId))
            .then(response => {
                dispatch(userData(getState().user.username));
                dispatch(friendRequests(getState().user.username, false));
            })
            .catch(error => {
                console.log("deleteError:", error);
                dispatch(friendFail(error.message));
            });
    };
};
