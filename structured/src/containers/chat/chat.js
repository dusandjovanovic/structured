import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/index';
import Request from '../social/request/request';
import classes from "./chat.css"
import MessageList from './message-list/messageList';

export class Chat extends Component {
    componentDidMount() {
        this.props.onGetUserData(this.props.username);
    };

    state = {
        messages1: [
            {
                sender: 'sender1',
                content: 'xyz'
            },
            {
                sender: 'sender2',
                content: 'qweewqrweqr'
            }
        ],
        messages2: [
            {
                sender: 'sender3',
                content: '...'
            },
            {
                sender: 'sender4',
                content: '...'
            }
        ]


    };

    sendMessage1 = (sender, receiver) => {
        // backend
    };

    sendMessage2 = (sender, receiver) => {
        // backend
    };

    render() {
        let friends = null;
        return (
            <span className={classes.Chat}>
                <Request
                    sender={this.props.username}
                    placeholder="message"
                    info=""
                    onAddFriend={(sender, receiver) => this.sendMessage1(sender, receiver)}/>

                <MessageList messages={this.state.messages1}/>

                <Request
                    sender={this.props.username}
                    placeholder="message"
                    info=""
                    onAddFriend={(sender, receiver) => this.sendMessage2(sender, receiver)}/>

                <MessageList messages={this.state.messages2}/>
            </span>);
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
        onGetUserData: (username) => dispatch(actions.userData(username))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Chat);
