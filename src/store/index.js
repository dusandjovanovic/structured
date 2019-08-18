import { combineReducers } from "redux";
import internalReducer from "./reducers/internal";
import authReducer from "./reducers/auth";
import userReducer from "./reducers/user";
import roomReducer from "./reducers/room";

export default combineReducers({
    internal: internalReducer,
    auth: authReducer,
    user: userReducer,
    room: roomReducer
});
