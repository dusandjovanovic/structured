import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import openSocket from 'socket.io-client';
import * as actions from "../../redux/actions";
const io = openSocket;

function withRedux (WrappedComponent) {
    return class extends React.Component {
        render() {
            return (
                <WrappedComponent io={io}
                                  username={this.props.username}
                                  room={this.props.room}
                                  data={this.props.data}
                                  error={this.props.error}
                                  {...this.props}
                />
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
        roomDeleteExisting: (roomId) => dispatch(actions.roomDeleteExisting(roomId))
    }
};

export default compose (
    connect(mapStateToProps, mapDispatchToProps),
    withRedux
);