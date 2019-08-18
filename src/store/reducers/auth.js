import {
	AUTH_INITIATE,
	AUTH_SUCCESS,
	AUTH_UPDATE_CREDENTIALS,
	AUTH_CLEAR_CREDENTIALS,
	AUTH_ERROR,
	AUTH_LOGOUT,
	AUTH_REDIRECT
} from "../actions.js";

const initialState = {
	authenticated: false,
	token: null,
	username: null,
	waiting: false,
	error: null,
	redirect: "/"
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_INITIATE:
			return {
				...state,
				waiting: true,
				error: null
			};
		case AUTH_SUCCESS:
			return {
				...state,
				authenticated: true,
				waiting: false,
				error: null
			};
		case AUTH_UPDATE_CREDENTIALS:
			return {
				...state,
				username: action.payload.username
			};
		case AUTH_CLEAR_CREDENTIALS:
			return {
				...state,
				token: null,
				username: null
			};
		case AUTH_ERROR:
			return {
				...state,
				authenticated: false,
				waiting: false,
				error: action.payload.error
			};
		case AUTH_LOGOUT:
			return {
				...state,
				authenticated: false,
				waiting: false,
				error: null
			};
		case AUTH_REDIRECT:
			return {
				...state,
				redirect: action.payload.redirect
			};
		default:
			return state;
	}
};

export default reducer;
