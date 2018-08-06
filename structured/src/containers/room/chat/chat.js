import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-chat-elements/dist/main.css';
import {Input, MessageList} from "react-chat-elements";
import { Button } from "reactstrap";

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:2998/chat');

class Chat extends Component {
    state = {
        messages: []
    };

    constructor() {
        super();
        socket.on('someRoomName', message => this.messageReceived(message));
    };

    messageReceived = (message) => {
        console.log('socketio::receive ', message);
        let position = "right";
        if (message.sender !== this.props.username)
            position = "left";
        let updated = [...this.state.messages];
        updated.push({
            sender: message.sender,
            text: message.msg,
            position: position,
            type: 'text',
            date: new Date(),
        });

        this.setState({
            messages: updated
        });
    };

    messageSend = (message) => {
        console.log('socketio::send ', message);
        socket.emit('chat message', {
            room: 'someRoomName',
            sender: this.props.username,
            msg: message
        });
    };

    render() {

        return (
            <div>
                <Input
                    placeholder="Type a message.."
                    minHeight={100}
                    ref='input'
                    rightButtons={
                        <Button color='white' onClick={() => this.messageSend(this.refs.input.input.value)}>
                            Send
                        </Button>
                    }/>
                <MessageList
                    className='message-list mt-2'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={this.state.messages} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username
    }
};

export default connect(mapStateToProps, null) (Chat);