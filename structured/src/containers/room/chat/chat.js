import React, { Component } from 'react';
import 'react-chat-elements/dist/main.css';
import {Input, MessageList} from "react-chat-elements";
import { Button } from "reactstrap";
import socketIo from "../../../components-higher/socketio/socketio";

class Chat extends Component {
    socket = null;
    state = {
        messages: []
    };

    constructor(props) {
        super(props);
        this.socket = this.props.socketio('http://localhost:2998/chat');
    };

    componentWillReceiveProps(newProps) {
        console.log(newProps);
        if (newProps.room !== this.props.room)
            this.socket.on(newProps.room, message => this.messageReceived(message));
    };

    componentWillUnmount() {
        this.socket.close();
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
        this.socket.emit('chat message', {
            room: this.props.room,
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

export default socketIo(Chat);