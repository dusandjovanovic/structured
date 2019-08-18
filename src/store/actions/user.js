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
} from "../../utils/constantsAPI";

import { internalNotificationsAdd } from "./index";

import {
	USER_INIT,
	USER_END,
	USER_ERROR,
	USER_FETCH_DATA,
	USER_FETCH_HISTORY,
	FRIENDS_FETCH_REQUESTS,
	FRIENDS_CONFIRM_REQUEST,
	FRIENDS_DENY_REQUEST
} from "../actions.js";

const userInit = () => {
	return {
		type: USER_INIT
	};
};

const userEnd = () => {
	return {
		type: USER_END
	};
};

const userError = error => {
	return {
		type: USER_ERROR,
		error: error
	};
};

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
	return async (dispatch, getState) => {
		dispatch(userInit());

		try {
			const response = await axios
				.getInstance()
				.get(userGetDataRoute(getState().auth.username));

			if (response.data.success) {
				dispatch(userFetchData(response.data.data.friends));
				dispatch(userEnd());
				dispatch(friendRequests(requests));
			} else {
				dispatch(userError(response.data.error));
			}
		} catch (error) {
			dispatch(userError(error.response.data.message));
		}
	};
};

export const userHistory = () => {
	return async (dispatch, getState) => {
		dispatch(userInit());

		try {
			const response = await axios
				.getInstance()
				.get(userGetHistoryRoute(getState().auth.username));

			if (response.data.success) {
				dispatch(userFetchHistory(response.data.data));
				dispatch(userEnd());
			} else {
				dispatch(userError(response.data.error));
			}
		} catch (error) {
			dispatch(userError(error.response.data.message));
		}
	};
};

export const userHistoryAdd = score => {
	return async (dispatch, getState) => {
		dispatch(userInit());
		const payload = {
			score: score
		};

		try {
			const response = await axios
				.getInstance()
				.put(userAddHistoryRoute(getState().auth.username), payload, {
					"Content-Type": "application/x-www-form-urlencoded"
				});

			if (response.data.success) {
				dispatch(userEnd());
				dispatch(
					internalNotificationsAdd(
						"Your solution was successfully submitted. You can see it in your history on dashboard.",
						"success"
					)
				);
			} else {
				dispatch(userError(response.data.error));
			}
		} catch (error) {
			dispatch(userError(error.response.data.message));
		}
	};
};

export const friendRequests = push => {
	return async (dispatch, getState) => {
		dispatch(userInit());

		try {
			const response = await axios
				.getInstance()
				.get(userGetFriendRequestsRoute(getState().auth.username));

			if (response.data.success) {
				dispatch(friendRequestsFetch(response.data.data));
				dispatch(userEnd());
				if (push)
					for (let req = 0; req < response.data.data.length; req++)
						dispatch(
							internalNotificationsAdd(
								"You have a new friend request from " +
									response.data.data[req].sender,
								"success"
							)
						);
			} else {
				dispatch(userError(response.data.message));
			}
		} catch (error) {
			dispatch(userError(error.response.data.message));
		}
	};
};

export const friendAdd = friendUsername => {
	return async (dispatch, getState) => {
		dispatch(userInit());
		const payload = {
			sender: getState().auth.username,
			receiver: friendUsername
		};

		try {
			const response = await axios
				.getInstance()
				.post(userFriendCheckRoute, payload, {
					"Content-Type": "application/x-www-form-urlencoded"
				});

			if (response.data.data.exists) {
				dispatch(
					internalNotificationsAdd(
						"You have already sent a friend request to that person. Please wait for a response.",
						"warning"
					)
				);
				dispatch(userEnd());
			} else {
				try {
					const responsePost = await axios
						.getInstance()
						.post(userFriendAddRoute, payload, {
							"Content-Type": "application/x-www-form-urlencoded"
						});

					if (responsePost.data.success)
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
				} catch (error) {
					dispatch(userError(error.response.data.message));
				}
			}
		} catch (error) {
			dispatch(userError(error.response.data.message));
		}
	};
};

export const friendConfirm = requestId => {
	return async dispatch => {
		dispatch(userInit());
		const payload = {
			id: requestId
		};

		try {
			await axios
				.getInstance()
				.post(userFriendConfirmRoute, payload, {
					"Content-Type": "application/x-www-form-urlencoded"
				});

			dispatch(friendsConfirmRequest(requestId));
			dispatch(userEnd());
		} catch (error) {
			dispatch(userError(error.response.data.message));
		}
	};
};

export const friendDelete = requestId => {
	return async dispatch => {
		dispatch(userInit());

		try {
			await axios.getInstance().delete(userFriendDeleteRoute(requestId));

			dispatch(friendsDenyRequest(requestId));
			dispatch(userEnd());
		} catch (error) {
			dispatch(userError(error.response.data.message));
		}
	};
};
