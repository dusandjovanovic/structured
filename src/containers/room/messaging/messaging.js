import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import withIOMessaging from "../../../hoc/with-io-messaging/withIOMessaging";
import PropTypes from "prop-types";

import classNames from "classnames";
import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

class Messaging extends React.PureComponent {
	state = {
		message: "",
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

	messageChange = event => {
		this.setState({
			message: event.target.value
		});
	};

	messageSend = () => {
		this.props.messageSendIO(
			this.state.message,
			this.props.room,
			this.props.username
		);
		this.messageReceived({
			sender: this.props.username,
			msg: this.state.message
		});
		this.setState({
			message: ""
		});
	};

	messageReceived = message => {
		let position = true;
		let content;
		if (message.sender !== this.props.username) {
			position = false;
			content = message.sender + ":  " + message.msg;
		} else content = message.msg;

		let updated = [...this.state.messages];
		updated.push({
			text: content,
			position: position,
			date: new Date()
		});
		this.setState({
			messages: updated
		});
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<div className={classes.messageContainer}>
					<TextField
						id="input-message"
						label="Your message"
						placeholder="Type a message to send here.."
						value={this.state.message}
						onChange={this.messageChange}
						className={classes.textField}
					/>
					<Button
						color="primary"
						onClick={this.messageSend}
						className={classes.button}
					>
						Send
					</Button>
				</div>
				<div className={classes.messageView}>
					{this.state.messages.map((message, index) => (
						<div key={index} className={classes.messageHolder}>
							<Grow in>
								<div
									className={classNames(
										classes.message,
										message.position
											? classes.messageRight
											: classes.messageLeft
									)}
								>
									{message.text}
								</div>
							</Grow>
						</div>
					))}
				</div>
			</div>
		);
	}
}

Messaging.propTypes = {
	classes: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired,
	room: PropTypes.string,
	socket: PropTypes.object.isRequired,
	initWebsocketIO: PropTypes.func.isRequired,
	messageSendIO: PropTypes.func.isRequired
};

export default withIOMessaging(withStyles(styles)(Messaging));
