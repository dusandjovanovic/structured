import * as actionTypes from './actions';

export const notificationAdd = (message, level, autoDismiss, action, onRemove) => {
    return {
        type: actionTypes.NOTIFICATION_ADD,
        message: message,
        level: level,
        autoDismiss: autoDismiss,
        action: action,
        onRemove: onRemove
    };
};

export const notificationSystem = (message, level, autoDismiss, action, onRemove) => {
    return dispatch => {
        dispatch(notificationAdd(message, level, autoDismiss, action, onRemove));
    };
};