import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import socketio from "socket.io-client";
import * as actions from "../../store/actions/index";
const io = socketio;

/* eslint react/display-name: 0 */

const withRedux = (WrappedComponent) => {
    return class extends React.Component {
        render() {
            return <WrappedComponent io={io} {...this.props} />;
        }
    };
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        data: state.room.data,
        room: state.room.room,
        error: state.room.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        roomLeaveExisting: (name, username, roomDeleted) =>
            dispatch(actions.roomLeaveExisting(name, username, roomDeleted)),
        roomDeleteExisting: roomId =>
            dispatch(actions.roomDeleteExisting(roomId)),
        roomGetGraph: name => dispatch(actions.roomGetGraph(name)),
        roomChangeGraph: (name, graph) =>
            dispatch(actions.roomChangeGraph(name, graph)),
        roomGetData: (name, username) =>
            dispatch(actions.roomGetData(name, username)),
        userHistoryAdd: (username, score) =>
            dispatch(actions.userHistoryAdd(username, score)),
        internalNotificationsAdd: (message, variant) =>
            dispatch(actions.internalNotificationsAdd(message, variant))
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withRedux
);
