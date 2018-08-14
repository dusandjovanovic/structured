import React, { Component } from 'react';
import 'react-chat-elements/dist/main.css';
import { Input, MessageList } from "react-chat-elements";
import { Button } from "reactstrap";

class Chat extends Component {
    socket = null;
    state = {
        messages: []
    };

    constructor(props) {
        super(props);
        this.socket = this.props.io('http://localhost:2998/chat');
        this.socket.on(this.props.room, message => this.messageReceived(message));
    };

    componentWillUnmount() {
        this.socket.close();
    };

    messageReceived = (message) => {
        let position = "right";
        let content;
        if (message.sender !== this.props.username) {
            position = "left";
            content = message.sender + ":  " + message.msg;
        }
        else
            content = message.msg;

        let updated = [...this.state.messages];
        updated.push({
            sender: message.sender,
            text: content,
            position: position,
            type: 'text',
            date: new Date(),
        });

        this.setState({
            messages: updated
        });
    };

    messageSend = (message) => {
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
                            <i className="far fa-comment"></i> Send
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

export default Chat;