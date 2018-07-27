import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import NotificationSystem from 'react-notification-system';


class NotificationContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.notificationSystem = this.refs.notificationSystem;
    }

    componentWillReceiveProps(newProps) {
        console.log('newProps:', newProps);
        const {message, level, autoDismiss, action, onRemove} = newProps.notification;
        this.notificationSystem.addNotification({
            message,
            level,
            autoDismiss,
            action,
            onRemove
        });
    }

    render() {
        return (
            <NotificationSystem ref="notificationSystem"/>
        );
    }
}

function mapStateToProps(state) {
    return {
        notification: state.notification
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps) (NotificationContainer);