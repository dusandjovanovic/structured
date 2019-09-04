import React from "react";
import socketio from "socket.io-client";
import PropTypes from "prop-types";
import { backendIOGraph } from "../../utils/constantsAPI";

const withIO = WrappedComponent => {
	class WIthIO extends React.Component {
		socket = null;
		io = socketio;

		constructor(props) {
			super(props);
			this.socket = this.io(backendIOGraph);
			this.state = {
				redirect: false
			};
		}

		componentDidMount() {
			window.addEventListener("beforeunload", this.leaveRoomIOInit);

			this.socket.on("deleteRoom", () => {
				this.props.roomLeaveExisting(true);
				this.props.internalNotificationsAdd(
					"The room has been deleted and you had to leave.",
					"danger"
				);
				this.setState({
					redirect: true
				});
			});
		}

		componentWillUnmount() {
			this.socket.close();
			window.removeEventListener("beforeunload", this.leaveRoomIOInit);
		}

		initWebsocketIO = () => {
			this.socket.emit("initWebsocket", {
				room: this.props.data.name
			});
		};

		addNodeIO = node => {
			this.socket.emit("addNode", {
				room: this.props.data.name,
				sender: this.props.username,
				node: node
			});
		};

		addEdgeIO = (source, target) => {
			this.socket.emit("addEdge", {
				room: this.props.data.name,
				sender: this.props.username,
				edge: {
					source: source,
					target: target
				}
			});
		};

		removeNodeIO = node => {
			this.socket.emit("removeNode", {
				room: this.props.data.name,
				sender: this.props.username,
				node: node
			});
		};

		removeEdgeIO = (source, target) => {
			this.socket.emit("removeEdge", {
				room: this.props.data.name,
				sender: this.props.username,
				edge: {
					source: source,
					target: target
				}
			});
		};

		changeGraphIO = graph => {
			if (graph) {
				this.socket.emit("graphChange", {
					room: this.props.room.name,
					graph: graph
				});
			}
		};

		competeBeginIO = (algorithmName, rootNode) => {
			this.socket.emit("competeBegin", {
				room: this.props.room.name,
				agName: algorithmName,
				root: rootNode
			});
		};

		competeEndedIO = score => {
			this.socket.emit("competeEnd", {
				room: this.props.room.name,
				user: this.props.username,
				score: score
			});
		};

		algorithmBeginIO = (algorithmName, algorithmIterations, rootNode) => {
			this.socket.emit("algorithmBegin", {
				room: this.props.room.name,
				agName: algorithmName,
				agIterations: algorithmIterations,
				root: rootNode
			});
		};

		algorithmEndedIO = () => {
			this.socket.emit("algorithmEnd", {
				room: this.props.room.name
			});
		};

		joinRoomIO = (username, master) => {
			this.socket.emit("joinRoom", {
				username: username,
				master: master
			});
		};

		joinLeaveRoomIO = (roomName, message) => {
			this.socket.emit("joinLeaveRoom", {
				room: roomName,
				msg: message
			});
		};

		deleteRoomIO = roomName => {
			this.socket.emit("deleteRoom", {
				room: roomName
			});
		};

		deleteRoomIOInit = async () => {
			try {
				const roomName = this.props.room.name;
				await this.props.roomDeleteExisting();
				this.deleteRoomIO(roomName);
				this.setState({
					redirect: true
				});
			} catch (error) {}
		};

		leaveRoomIOInit = async () => {
			try {
				const roomName = this.props.room.name;
				const response = await this.props.roomLeaveExisting(false);
				if (response.data.newMaster)
					this.masterChangedIO(roomName, response.data.newMaster);
				else this.joinLeaveRoomIO(roomName, response.data.message);

				this.setState({
					redirect: true
				});

				return "unloading";
			} catch (error) {}
		};

		masterChangedIO = (room, master) => {
			this.socket.emit("masterChanged", {
				room: room,
				master: master
			});
		};

		render() {
			return (
				<WrappedComponent
					io={this.io}
					initWebsocketIO={this.initWebsocketIO}
					addNodeIO={this.addNodeIO}
					addEdgeIO={this.addEdgeIO}
					removeNodeIO={this.removeNodeIO}
					removeEdgeIO={this.removeEdgeIO}
					changeGraphIO={this.changeGraphIO}
					competeBeginIO={this.competeBeginIO}
					competeEndedIO={this.competeEndedIO}
					algorithmBeginIO={this.algorithmBeginIO}
					algorithmEndedIO={this.algorithmEndedIO}
					joinRoomIO={this.joinRoomIO}
					joinLeaveRoomIO={this.joinLeaveRoomIO}
					deleteRoomIO={this.deleteRoomIO}
					leaveRoomIOInit={this.leaveRoomIOInit}
					deleteRoomIOInit={this.deleteRoomIOInit}
					masterChangedIO={this.masterChangedIO}
					socket={this.socket}
					redirect={this.state.redirect}
					{...this.props}
				/>
			);
		}
	}

	WIthIO.propTypes = {
		username: PropTypes.string.isRequired,
		data: PropTypes.object.isRequired,
		room: PropTypes.object.isRequired,
		error: PropTypes.string,
		roomLeaveExisting: PropTypes.func.isRequired,
		roomDeleteExisting: PropTypes.func.isRequired,
		roomGetGraph: PropTypes.func.isRequired,
		roomChangeGraph: PropTypes.func.isRequired,
		roomGetTraversal: PropTypes.func.isRequired,
		roomChangeTraversal: PropTypes.func.isRequired,
		roomGetData: PropTypes.func.isRequired,
		userHistoryAdd: PropTypes.func.isRequired,
		internalNotificationsAdd: PropTypes.func.isRequired
	};

	return WIthIO;
};

export default withIO;
