import {
    INTERNAL_NOTIFICATIONS_ADD,
    INTERNAL_NOTIFICATIONS_REMOVE
} from "../actions.js";

export const internalNotificationsAdd = (message, variant, id) => {
    return {
        type: INTERNAL_NOTIFICATIONS_ADD,
        payload: {
            notificationItem: {
                message: message
                    ? message
                    : "Something went wrong. If this happens again please let us know.",
                variant: variant,
                id: id ? id : +new Date()
            }
        }
    };
};

export const internalNotificationsRemove = id => {
    return {
        type: INTERNAL_NOTIFICATIONS_REMOVE,
        payload: {
            id: id
        }
    };
};
