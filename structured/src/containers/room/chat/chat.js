import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "react-chat-elements/dist/main.css";
import { Input, MessageList } from "react-chat-elements";

class Chat extends React.Component {
    socket = null;
    state = {
        messages: []
    };

    constructor(props) {
        super(props);
        this.socket = this.props.io("http://localhost:2998/chat");
        this.socket.on(this.props.room, message =>
            this.messageReceived(message)
        );
    }

    componentWillUnmount() {
        this.socket.close();
    }

    messageReceived = message => {
        let position = "right";
        let content;
        if (message.sender !== this.props.username) {
            position = "left";
            content = message.sender + ":  " + message.msg;
        } else content = message.msg;

        let updated = [...this.state.messages];
        updated.push({
            sender: message.sender,
            text: content,
            position: position,
            type: "text",
            date: new Date()
        });

        this.setState({
            messages: updated
        });
    };

    messageSend = message => {
        this.socket.emit("chat message", {
            room: this.props.room,
            sender: this.props.username,
            msg: message
        });
    };

    render() {
        return (
            <Grid container>
                <Input
                    ref="input"
                    placeholder="Type a message.."
                    minHeight={100}
                    rightButtons={
                        <Button
                            color="primary"
                            onClick={() =>
                                this.messageSend(this.refs.input.input.value)
                            }
                        >
                            Send
                        </Button>
                    }
                />
                <MessageList
                    className="message-list"
                    lockable={true}
                    toBottomHeight={"100%"}
                    dataSource={this.state.messages}
                />
            </Grid>
        );
    }
}

export default Chat;
