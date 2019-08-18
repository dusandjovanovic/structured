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

			this.socket.on(this.props.room.name + " delete room", () => {
				this.props.roomLeaveExisting(true);
				this.props.internalNotificationsAdd(
					"The room has been deleted.",
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

		addNodeIO = node => {
			this.socket.emit("add node", {
				room: this.props.data.name,
				sender: this.props.username,
				node: node
			});
		};

		addEdgeIO = (source, target) => {
			this.socket.emit("add edge", {
				room: this.props.data.name,
				sender: this.props.username,
				edge: {
					source: source,
					target: target
				}
			});
		};

		removeNodeIO = node => {
			this.socket.emit("remove node", {
				room: this.props.data.name,
				sender: this.props.username,
				node: node
			});
		};

		removeEdgeIO = (source, target) => {
			this.socket.emit("remove edge", {
				room: this.props.data.name,
				sender: this.props.username,
				edge: {
					source: source,
					target: target
				}
			});
		};

		addGraphIO = (receiver, graph) => {
			if (graph) {
				this.socket.emit("graph", {
					room: this.props.room.name,
					username: receiver,
					graph: graph
				});
			}
		};

		changeGraphIO = graph => {
			if (graph) {
				this.socket.emit("graph change", {
					room: this.props.room.name,
					graph: graph
				});
			}
		};

		getGraphIO = () => {
			this.socket.emit("get graph", {
				username: this.props.username,
				masterName: this.props.data.createdBy
			});
		};

		competeBeginIO = (algorithmName, rootNode) => {
			this.socket.emit("compete begin", {
				room: this.props.room.name,
				agName: algorithmName,
				root: rootNode
			});
		};

		competeEndedIO = score => {
			this.socket.emit("compete end", {
				room: this.props.room.name,
				user: this.props.username,
				score: score
			});
		};

		algorithmBeginIO = (algorithmName, algorithmIterations, rootNode) => {
			this.socket.emit("algorithm begin", {
				room: this.props.room.name,
				agName: algorithmName,
				agIterations: algorithmIterations,
				root: rootNode
			});
		};

		algorithmEndedIO = () => {
			this.socket.emit("algorithm end", {
				room: this.props.room.name
			});
		};

		joinLeaveRoomIO = (roomName, message) => {
			this.socket.emit("join and leave room", {
				room: roomName,
				msg: message
			});
		};

		deleteRoomIO = roomName => {
			this.socket.emit("delete room", {
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
			this.socket.emit("master changed", {
				room: room,
				master: master
			});
		};

		render() {
			return (
				<WrappedComponent
					io={this.io}
					addNodeIO={this.addNodeIO}
					addEdgeIO={this.addEdgeIO}
					removeNodeIO={this.removeNodeIO}
					removeEdgeIO={this.removeEdgeIO}
					addGraphIO={this.addGraphIO}
					getGraphIO={this.getGraphIO}
					changeGraphIO={this.changeGraphIO}
					competeBeginIO={this.competeBeginIO}
					competeEndedIO={this.competeEndedIO}
					algorithmBeginIO={this.algorithmBeginIO}
					algorithmEndedIO={this.algorithmEndedIO}
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
		roomGetData: PropTypes.func.isRequired,
		userHistoryAdd: PropTypes.func.isRequired,
		internalNotificationsAdd: PropTypes.func.isRequired
	};

	return WIthIO;
};

export default withIO;
