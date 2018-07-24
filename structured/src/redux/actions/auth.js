import * as actionTypes from './actionTypes'
import axios from '../../util/axiosHandler'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const authCheckTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000)
    }
};

export const auth = (username, password, modeSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: username,
            password: password
        };

        let url = '/api/auth/register';
        if (!modeSignup)
            url = '/api/auth/login';
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.token, response.data.success));
                //dispatch(authCheckTimeout(response.data.expiresIn));
            })
            .catch(error => {
                console.log('message: ', error);
                dispatch(authFail("Login failed. Username or password not match."));
            });
    }
};