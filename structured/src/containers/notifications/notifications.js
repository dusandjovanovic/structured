import React, {Component} from 'react';
import { connect } from 'react-redux';
import NotificationSystem from 'react-notification-system';


class NotificationContainer extends Component {
    componentDidMount(){
        this.notificationSystem = this.refs.notificationSystem;
    }

    componentWillReceiveProps(newProps) {
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
            <NotificationSystem ref="notificationSystem" />
        );
    }
}

function mapStateToProps(state) {
    return {
        notification: state.notification
    };
}

export default connect(mapStateToProps) (NotificationContainer);