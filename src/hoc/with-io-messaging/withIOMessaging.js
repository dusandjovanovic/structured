import React from "react";
import PropTypes from "prop-types";
import { backendIOMessaging } from "../../utils/constantsAPI";

const withIOMessaging = WrappedComponent => {
	class WithIOMessaging extends React.Component {
		socket = null;

		constructor(props) {
			super(props);
			this.socket = this.props.io(backendIOMessaging);
		}

		componentWillUnmount() {
			this.socket.close();
		}

		initWebsocketIO = room => {
			this.socket.emit("initWebsocket", {
				room: room
			});
		};

		messageSendIO = (message, room, sender) => {
			this.socket.emit("newMessage", {
				room: room,
				sender: sender,
				msg: message
			});
		};

		render() {
			return (
				<WrappedComponent
					initWebsocketIO={this.initWebsocketIO}
					messageSendIO={this.messageSendIO}
					socket={this.socket}
					{...this.props}
				/>
			);
		}
	}

	WithIOMessaging.propTypes = {
		io: PropTypes.func.isRequired
	};

	return WithIOMessaging;
};

export default withIOMessaging;
