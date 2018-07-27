import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/index';
import ListElement from '../../components/list-element/listElement';
import Request from './request/request';

export class Social extends Component {
    componentDidMount() {
        this.props.onGetUserData(this.props.username);
        this.props.onGetFriendRequests(this.props.username);
    };

    render() {
        let friends = null;
        if (this.props.friends) {
            friends = (
                this.props.friends.map((friend => (
                    <ListElement
                        username={friend}
                        key={friend}
                        picture={null}
                        bio={"Lorem ipsum dolor sit amet, eu mel congue dolores definiebas. Te cum enim iusto ponderum, eos et enim saepe quaeque."}
                    />
                )))
            );
        }
        return (
            <div>
                <Request
                    sender={this.props.username}
                    onAddFriend={(sender, receiver) => this.props.onAddFriend(sender, receiver)}/>
                {friends}
            </div>);
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
        onGetUserData: (username) => dispatch(actions.userData(username)),
        onGetFriendRequests: (username) => dispatch(actions.friendRequests(username)),
        onAddFriend: (sender, receiver) => dispatch(actions.friendAdd(sender, receiver)),
        onConfirmFriend: (requestId, username) => dispatch(actions.friendConfirm(requestId, username)),
        onDeleteFriend: (requestId) => dispatch(actions.friendDelete(requestId)),
        onNotificationSystem: (message, level, autoDismiss, action, onRemove) => dispatch(actions.notificationSystem(message, level, autoDismiss, action, onRemove))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Social);