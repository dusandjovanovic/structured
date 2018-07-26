import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/index';

export class Social extends Component {
    componentDidMount() {
        this.props.onGetUserData(this.props.username);
        // napravi nalozi Debug i Sender
        // uloguj se kao Debug prvo
        // predji na User Management tab
        this.props.onAddFriend("Sender", "Debug");
        this.props.onGetFriendRequests("Debug");
        // console: requestsData
    }

    render() {
        return (<p>List</p>);
    };
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        friends: state.user.friends
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onGetUserData: (username) => dispatch(actions.user(username)),
        onGetFriendRequests: (username) => dispatch(actions.friendRequests(username)),
        onAddFriend: (sender, receiver) => dispatch(actions.friendAdd(sender, receiver)),
        onConfirmFriend: (requestId) => dispatch(actions.friendConfirm(requestId)),
        onDeleteFriend: (requestId) => dispatch(actions.friendDelete(requestId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Social);