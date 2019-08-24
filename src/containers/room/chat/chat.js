import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Input, MessageList } from "react-chat-elements";
import withIOMessaging from "../../../hoc/with-io-messaging/withIOMessaging";
import "react-chat-elements/dist/main.css";
import PropTypes from "prop-types";

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
		this.props.initWebsocketIO(this.props.room);
		this.props.socket.on("newMessage", message =>
			this.messageReceived(message)
		);
	}

	messageSend = () => {
		const message = this.inputRef.current.input.value;
		this.props.messageSendIO(message, this.props.room, this.props.username);
		this.messageReceived({
			sender: this.props.username,
			msg: message
		});
	};

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
							<Button color="primary" onClick={this.messageSend}>
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

Chat.propTypes = {
	classes: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired,
	room: PropTypes.string,
	socket: PropTypes.object.isRequired,
	initWebsocketIO: PropTypes.func.isRequired,
	messageSendIO: PropTypes.func.isRequired
};

export default withIOMessaging(withStyles(styles)(Chat));
