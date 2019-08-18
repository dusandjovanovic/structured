import {
	AUTH_INITIATE,
	AUTH_SUCCESS,
	AUTH_UPDATE_CREDENTIALS,
	AUTH_CLEAR_CREDENTIALS,
	AUTH_ERROR,
	AUTH_LOGOUT,
	AUTH_REDIRECT
} from "../actions.js";

import { userData } from "./index";
import { initAuth, readAuth, removeAuth } from "../../utils/storage";
import {
	axios,
	authLoginRoute,
	authRegisterRoute
} from "../../utils/constantsAPI";

const authUpdateCredentials = (username) => {
	return {
		type: AUTH_UPDATE_CREDENTIALS,
		payload: {
			username
		}
	};
};

const authClearCredentials = () => {
	return {
		type: AUTH_CLEAR_CREDENTIALS
	};
};

const authInitiate = () => {
	return {
		type: AUTH_INITIATE
	};
};

const authSuccess = () => {
	return {
		type: AUTH_SUCCESS
	};
};

const authLogout = () => {
	removeAuth();
	return {
		type: AUTH_LOGOUT
	};
};

const authError = error => {
	return {
		type: AUTH_ERROR,
		payload: {
			error: error
		}
	};
};

export const authRedirect = redirectPath => {
	return {
		type: AUTH_REDIRECT,
		payload: {
			redirect: redirectPath
		}
	};
};

export const authenticatePersisted = () => {
	return dispatch => {
		let local = readAuth();
		if (local && local.user_id) {
			dispatch(authUpdateCredentials(local.user_id));
			dispatch(authSuccess());
			dispatch(userData(true));
		}
	};
};

export const authenticateLogin = (username, password, remember) => {
	return async dispatch => {
		dispatch(authInitiate());
		const payload = {
			username: username,
			password: password
		};

		try {
			const response = await axios
				.getInstance()
				.post(authLoginRoute, payload, {
					"Content-Type": "application/x-www-form-urlencoded"
				});

			if (remember) initAuth(response.data.user.username);
			dispatch(authUpdateCredentials(response.data.user.username));
			dispatch(authSuccess());
			dispatch(userData(true));
		} catch (error) {
			dispatch(authError(error.response.data.message));
		}
	};
};

export const authenticateRegister = (username, password, remember) => {
	return async dispatch => {
		dispatch(authInitiate());
		const payload = {
			username: username,
			password: password
		};

		try {
			const response = await axios
				.getInstance()
				.post(authRegisterRoute, payload, {
					"Content-Type": "application/x-www-form-urlencoded"
				});

			if (remember) initAuth(response.data.user.username);
			dispatch(authUpdateCredentials(response.data.user.username));
			dispatch(authSuccess());
			dispatch(userData(true));
		} catch (error) {
			dispatch(authError(error.response.data.message));
		}
	};
};

export const authenticateLogout = () => {
	return dispatch => {
		dispatch(authClearCredentials());
		dispatch(authLogout());
	};
};
