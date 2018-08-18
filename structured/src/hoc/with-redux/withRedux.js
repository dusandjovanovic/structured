import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import socketio from 'socket.io-client';
import * as actions from "../../redux/actions";
const io = socketio;

function withRedux (WrappedComponent) {
    return class extends React.Component {
        render() {
            return (
                <WrappedComponent io={io} {...this.props} />
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        data: state.room.data,
        room: state.room.room,
        error: state.room.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        roomLeaveExisting: (name, username) => dispatch(actions.roomLeaveExisting(name, username)),
        roomDeleteExisting: (roomId) => dispatch(actions.roomDeleteExisting(roomId)),
        roomGetGraph: (name) => dispatch(actions.roomGetGraph(name)),
        roomChangeGraph: (name, graph) => dispatch(actions.roomChangeGraph(name, graph)),
        userCompeteScore: (username, score) => dispatch(actions.userCompeteScore(username, score)),
        notificationPush: (message, level, autoDismiss, action, onRemove) => dispatch(action.notificationSystem(message, level, autoDismiss, action, onRemove))
    }
};

export default compose (
    connect(mapStateToProps, mapDispatchToProps),
    withRedux
);