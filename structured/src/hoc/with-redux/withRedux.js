import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";

import socketio from "socket.io-client";
import * as actions from "../../store/actions/index";
const io = socketio;

const withRedux = WrappedComponent => {
    const withRedux = class extends React.Component {
        render() {
            return <WrappedComponent io={io} {...this.props} />;
        }
    };

    withRedux.displayName = "withRedux";

    withRedux.propTypes = {
        username: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
        room: PropTypes.object.isRequired,
        error: PropTypes.string,
        roomLeaveExisting: PropTypes.func.isRequired,
        roomDeleteExisting: PropTypes.func.isRequired,
        roomGetGraph: PropTypes.func.isRequired,
        roomChangeGraph: PropTypes.func.isRequired,
        roomGetData: PropTypes.func.isRequired,
        userHistoryAdd: PropTypes.func.isRequired,
        internalNotificationsAdd: PropTypes.func.isRequired
    };

    return withRedux;
};

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
        roomLeaveExisting: roomDeleted =>
            dispatch(actions.roomLeaveExisting(roomDeleted)),
        roomDeleteExisting: () => dispatch(actions.roomDeleteExisting()),
        roomGetGraph: name => dispatch(actions.roomGetGraph(name)),
        roomChangeGraph: (name, graph) =>
            dispatch(actions.roomChangeGraph(name, graph)),
        roomGetData: name => dispatch(actions.roomGetData(name)),
        userHistoryAdd: score => dispatch(actions.userHistoryAdd(score)),
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
