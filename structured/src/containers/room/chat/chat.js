import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Input, MessageList } from "react-chat-elements";
import withIOMessaging from "../../../hoc/with-io-messaging/withIOMessaging";
import "react-chat-elements/dist/main.css";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

class Chat extends React.PureComponent {
    state = {
        messages: []
    };

    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.props.socket.on(this.props.room, message =>
            this.messageReceived(message)
        );
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
            text: content,
            position: position,
            type: "text",
            date: new Date()
        });

        this.setState({
            messages: updated
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Input
                        ref={this.inputRef}
                        placeholder="Type a message to send.."
                        inputStyle={{
                            margin: "0.75rem"
                        }}
                        rightButtons={
                            <Button
                                color="primary"
                                onClick={() =>
                                    this.props.messageSendIO(
                                        this.inputRef.current.input.value,
                                        this.props.room,
                                        this.props.username
                                    )
                                }
                            >
                                Message
                            </Button>
                        }
                    />
                </Grid>
                <Grid item xs={12} className={classes.messageView}>
                    <MessageList
                        className="message-list"
                        lockable={true}
                        toBottomHeight={"100%"}
                        dataSource={this.state.messages}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default withIOMessaging(withStyles(styles)(Chat));
