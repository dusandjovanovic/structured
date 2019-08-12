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

import { internalNotificationsAdd } from "./index";

import {
    USER_FETCH_DATA,
    USER_FETCH_HISTORY,
    USER_FETCH_DATA_INIT,
    USER_FETCH_DATA_END,
    USER_FETCH_DATA_FAIL,
    FRIENDS_FETCH_REQUESTS,
    FRIENDS_CONFIRM_REQUEST,
    FRIENDS_DENY_REQUEST
} from "../actions.js";

const userFetchData = friends => {
    return {
        type: USER_FETCH_DATA,
        friends: friends
    };
};

const userFetchHistory = history => {
    return {
        type: USER_FETCH_HISTORY,
        history: history
    };
};

const userFetchDataInit = () => {
    return {
        type: USER_FETCH_DATA_INIT
    };
};

const userFetchDataEnd = () => {
    return {
        type: USER_FETCH_DATA_END
    };
};

const userFetchDataFail = error => {
    return {
        type: USER_FETCH_DATA_FAIL,
        error: error
    };
};

const friendFail = error => {
    return {
        type: USER_FETCH_DATA_FAIL,
        error: error
    };
};

const friendRequestsFetch = requests => {
    return {
        type: FRIENDS_FETCH_REQUESTS,
        requests: requests
    };
};

const friendsConfirmRequest = requestId => {
    return {
        type: FRIENDS_CONFIRM_REQUEST,
        requestId: requestId
    };
};

const friendsDenyRequest = requestId => {
    return {
        type: FRIENDS_DENY_REQUEST,
        requestId: requestId
    };
};

export const userData = (requests = false) => {
    return (dispatch, getState) => {
        dispatch(userFetchDataInit());

        axios
            .getInstance()
            .get(userGetDataRoute(getState().auth.username))
            .then(response => {
                if (response.data.success) {
                    dispatch(userFetchData(response.data.data.friends));
                    dispatch(userFetchDataEnd());
                    dispatch(friendRequests(requests));
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

export const userHistory = () => {
    return (dispatch, getState) => {
        dispatch(userFetchDataInit());

        axios
            .getInstance()
            .get(userGetHistoryRoute(getState().auth.username))
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
        dispatch(userFetchDataInit());

        const data = {
            score: score
        };

        axios
            .getInstance()
            .put(userAddHistoryRoute(username), data)
            .then(response => {
                if (response.data.success) {
                    dispatch(userFetchDataEnd());
                    dispatch(
                        internalNotificationsAdd(
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

export const friendRequests = push => {
    return (dispatch, getState) => {
        dispatch(userFetchDataInit());

        axios
            .getInstance()
            .get(userGetFriendRequestsRoute(getState().auth.username))
            .then(response => {
                if (response.data.success) {
                    if (push)
                        for (
                            let req = 0;
                            req < response.data.data.length;
                            req++
                        )
                            dispatch(
                                internalNotificationsAdd(
                                    "You have a new friend request from " +
                                        response.data.data[req].sender,
                                    "success"
                                )
                            );
                    dispatch(userFetchDataEnd());
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
        dispatch(userFetchDataInit());

        const data = {
            sender: getState().auth.username,
            receiver: friendUsername
        };

        axios
            .getInstance()
            .post(userFriendCheckRoute, data)
            .then(response => {
                if (response.data.data.exists) {
                    dispatch(
                        internalNotificationsAdd(
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
                                    internalNotificationsAdd(
                                        "Friend request sent to " +
                                            friendUsername +
                                            ".",
                                        "success"
                                    )
                                );
                            else
                                dispatch(
                                    internalNotificationsAdd(
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
                dispatch(userFetchDataEnd());
            })
            .catch(error => {
                console.log("addError:", error);
                dispatch(friendFail(error.message));
            });
    };
};

export const friendConfirm = requestId => {
    return dispatch => {
        dispatch(userFetchDataInit());

        const data = {
            id: requestId
        };

        axios
            .getInstance()
            .post(userFriendConfirmRoute, data)
            .then(() => {
                dispatch(friendsConfirmRequest(requestId));
                dispatch(userFetchDataEnd());
            })
            .catch(error => {
                console.log("confirmError:", error);
                dispatch(friendFail(error.message));
            });
    };
};

export const friendDelete = requestId => {
    return dispatch => {
        dispatch(userFetchDataInit());

        axios
            .getInstance()
            .delete(userFriendDeleteRoute(requestId))
            .then(() => {
                dispatch(friendsDenyRequest(requestId));
                dispatch(userFetchDataEnd());
            })
            .catch(error => {
                console.log("deleteError:", error);
                dispatch(friendFail(error.message));
            });
    };
};
