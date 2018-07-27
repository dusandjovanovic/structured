import * as actionTypes from '../actions/actions';

const initialState = {

};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.NOTIFICATION_ADD:
            return Object.assign({}, state, {
                message: action.message,
                level: action.level,
                autoDismiss: action.autoDismiss,
                action: action.action,
                onRemove: action.onRemove
            });
        default:
            return state;
    }
};

export default reducer;