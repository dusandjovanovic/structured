import * as actionTypes from './actions';
import axios from '../../util/axiosHandler';
import * as actions from './index';

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
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
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
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', username);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess(response.data.token, username));
                dispatch(actions.friendRequests(username));
                dispatch(authCheckTimeout(3600));
            })
            .catch(error => {
                console.log('authError:', error);
                dispatch(authFail("Login failed. Username or password not match."));
            });
    }
};

export const authSetRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_SET_REDIRECT,
        path: path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token)
            dispatch(authLogout());
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date())
            dispatch(authLogout());
        else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
            dispatch(actions.friendRequests(userId));
            dispatch(authCheckTimeout((expirationDate.getTime() - new Date().getTime())/1000));
        }
    }
};