import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/index';
import Request from '../social/request/request';
import classes from "./chat.css"
import MessageList from './message-list/messageList';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:2998');

export class Chat extends Component {
    constructor() {
        super();

        socket.on('chat1', rcv => this.messageReceived1(rcv));
        socket.on('chat2', rcv => this.messageReceived2(rcv));
    }

    messageReceived1(rcv) {
        this.state.messages1.push({
            sender: rcv.sender,
            content: rcv.msg
        });
        this.setState(this.state);
    };

    messageReceived2(rcv) {
        this.state.messages2.push({
            sender: rcv.sender,
            content: rcv.msg
        });
        this.setState(this.state);
    };

    componentDidMount() {
        this.props.onGetUserData(this.props.username);
    };

    state = {
        messages1: [],
        messages2: []
    };

    sendMessage1 = (sender, receiver) => {
        socket.emit('chat message', {
            room: 'chat1',
            sender: this.props.username,
            msg: receiver
        });
    };

    sendMessage2 = (sender, receiver) => {
        socket.emit('chat message', {
            room: 'chat2',
            sender: this.props.username,
            msg: receiver
        });
    };

    render() {
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
