import {
	INTERNAL_NOTIFICATIONS_ADD,
	INTERNAL_NOTIFICATIONS_REMOVE
} from "../actions.js";

import forEach from "lodash/forEach";

const initialState = {
	notifications: []
};

const reducer = (state = initialState, action) => {
	let array = state.notifications.map(element => ({ ...element }));
	switch (action.type) {
		case INTERNAL_NOTIFICATIONS_ADD: {
			array.push(action.payload.notificationItem);
			return {
				...state,
				notifications: array
			};
		}
		case INTERNAL_NOTIFICATIONS_REMOVE: {
			forEach(state.notifications, function(notification) {
				if (
					notification.id === action.payload.id &&
					notification.onDismiss
				)
					notification.onDismiss();
			});
			return {
				...state,
				notifications: array.filter(
					element => element.id !== action.payload.id
				)
			};
		}
		default:
			return state;
	}
};

export default reducer;
