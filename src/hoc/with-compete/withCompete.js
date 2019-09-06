import React from "react";
import Compete from "../../containers/room/toolbar/toolbar-compete/compete";
import CompeteSpectator from "../../containers/room/toolbar/toolbar-compete/competeSpectator";
import PropTypes from "prop-types";

import forEach from "lodash/forEach";

import {
	COMPETE_BREADTH,
	COMPETE_DEPTH,
	GRAPH_MANAGED_COMPETE
} from "../../utils/constants";

const withCompete = WrappedComponent => {
	class WithCompete extends React.Component {
		state = {
			competeType: COMPETE_BREADTH,
			graph: []
		};

		componentDidMount() {
			this.props.initiateGraph(this.props.data.graph);
			this.props.initWebsocketIO();

			if (this.props.username !== this.props.data.createdBy) {
				this.props.socket.on("graphChange", received => {
					this.props.initiateGraph(received.graph);
				});
			} else if (this.props.username === this.props.data.createdBy) {
				this.props.socket.on("initMember", () => {
					if (this.props.graphOperation === GRAPH_MANAGED_COMPETE)
						this.props.competeBeginIO(
							this.state.competeType,
							this.props.nodeRoot
						);
				});
			}

			this.props.socket.on("masterChanged", received => {
				this.props.roomGetData(this.props.room.name, false);
				this.props.internalNotificationsAdd(received.msg, "warning");
			});

			this.props.socket.on("joinLeaveRoom", received => {
				this.props.roomGetData(this.props.room.name, false);
				this.props.internalNotificationsAdd(received.msg, "info");
			});

			this.props.socket.on("competeBegin", received => {
				this.competeInitiate(received.agName, received.root);
			});

			this.props.socket.on("competeEnd", received => {
				this.competeEndedByFriend(received.user, received.score);
			});

			this.props.joinRoomIO(
				this.props.username,
				this.props.data.createdBy
			);

			this.props.joinLeaveRoomIO(
				this.props.room.name,
				this.props.username + " has just joined the room."
			);
		}

		componentDidUpdate(prevProps) {
			if (
				this.props.room.master &&
				this.props.room.master !== prevProps.room.master
			) {
				this.props.socket.off("graphChange");
				this.props.socket.off("deleteRoom");
			}
		}

		competeBegin = async () => {
			let graphTraversed = this.props.graph.algorithm(
				this.props.nodeRoot,
				this.state.competeType
			);
			try {
				await this.props.roomChangeTraversal(graphTraversed);
				this.setState({
					graph: this.props.data.graphTraversed
				});
				this.props.graphManagedCompete();
				this.props.competeBeginIO(
					this.state.competeType,
					this.props.nodeRoot
				);
			} catch (error) {
				this.setState({
					graph: []
				});
			}
		};

		competeInitiate = async (algorithm, root) => {
			this.props.internalNotificationsAdd(
				(this.props.room.master ? "You" : "A room Master").concat(
					" just started a compete session. Submit your solution when ready!"
				),
				"warning"
			);
			if (!this.props.graphManaged) {
				try {
					await this.props.roomGetTraversal();
					this.props.graphManagedCompete();
					this.props.graphNodeRoot(root);
					this.setState({
						competeType: algorithm,
						graph: this.props.data.graphTraversed
					});
				} catch (error) {
					this.setState({
						graph: []
					});
				}
			}
		};

		competeEnded = () => {
			let scored = 0;
			forEach(this.props.nodesHighlighted, (node, index) => {
				if (typeof this.state.graph[index] !== "undefined")
					scored +=
						this.props.nodesHighlighted[index] ===
						this.state.graph[index]
							? 100 / this.state.graph.length
							: 0;
			});
			this.props.competeEndedIO(scored);
			this.props.userHistoryAdd(scored);
			this.props.graphManagedEnded();
			this.props.roomGetGraph();
			this.props.joinRoomIO(
				this.props.username,
				this.props.data.createdBy
			);
		};

		competeEndedByFriend = (username, score) => {
			this.props.internalNotificationsAdd(
				(this.props.username === username ? "You" : username).concat(
					" just finished the competition. With the overall score of " +
						score.toFixed(2) +
						" points."
				),
				"info"
			);
		};

		competeBreadth = () => {
			this.setState({
				competeType: COMPETE_BREADTH
			});
		};

		competeDepth = () => {
			this.setState({
				competeType: COMPETE_DEPTH
			});
		};

		render() {
			return (
				<React.Fragment>
					{this.props.room.master ? (
						<WrappedComponent competitive {...this.props}>
							<Compete
								randomGraph={this.props.randomGraph}
								competeBegin={this.competeBegin}
								competeEnded={this.competeEnded}
								competeEndedByFriend={this.competeEndedByFriend}
								competeBreadth={this.competeBreadth}
								competeDepth={this.competeDepth}
								graphManaged={this.props.graphManaged}
								graphExists={
									this.props.visualization.nodes.length > 0
								}
								competeType={this.state.competeType}
								leaveRoomIOInit={this.props.leaveRoomIOInit}
								deleteRoomIOInit={this.props.deleteRoomIOInit}
							/>
						</WrappedComponent>
					) : (
						<WrappedComponent competitive {...this.props}>
							<CompeteSpectator
								competeEnded={this.competeEnded}
								graphManaged={this.props.graphManaged}
								competeType={this.state.competeType}
								leaveRoomIOInit={this.props.leaveRoomIOInit}
							/>
						</WrappedComponent>
					)}
				</React.Fragment>
			);
		}
	}

	WithCompete.propTypes = {
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
		internalNotificationsAdd: PropTypes.func.isRequired,

		initWebsocketIO: PropTypes.func,
		addNodeIO: PropTypes.func,
		addEdgeIO: PropTypes.func,
		removeNodeIO: PropTypes.func,
		removeEdgeIO: PropTypes.func,
		changeGraphIO: PropTypes.func,
		competeBeginIO: PropTypes.func,
		competeEndedIO: PropTypes.func,
		algorithmBeginIO: PropTypes.func,
		algorithmEndedIO: PropTypes.func,
		joinRoomIO: PropTypes.func,
		joinLeaveRoomIO: PropTypes.func,
		deleteRoomIO: PropTypes.func,
		masterChangedIO: PropTypes.func,
		socket: PropTypes.object,
		redirect: PropTypes.bool.isRequired,
		leaveRoomIOInit: PropTypes.func.isRequired,
		deleteRoomIOInit: PropTypes.func.isRequired,

		graph: PropTypes.object.isRequired,
		visualization: PropTypes.object.isRequired,
		initiateGraph: PropTypes.func.isRequired,
		randomGraph: PropTypes.func.isRequired,
		randomGraphOffline: PropTypes.func.isRequired,
		addNode: PropTypes.func.isRequired,
		addReceivedNode: PropTypes.func.isRequired,
		removeNode: PropTypes.func.isRequired,
		removeReceivedNode: PropTypes.func.isRequired,
		addEdge: PropTypes.func.isRequired,
		addReceivedEdge: PropTypes.func.isRequired,
		removeEdge: PropTypes.func.isRequired,
		removeReceivedEdge: PropTypes.func.isRequired,
		nodeSelected: PropTypes.object,
		nodeFocused: PropTypes.object,
		nodeCurrent: PropTypes.string,
		nodesHighlighted: PropTypes.arrayOf(PropTypes.string),
		nodesAdjacent: PropTypes.arrayOf(PropTypes.string),
		nodeRoot: PropTypes.string,
		handlerNodeSelected: PropTypes.func.isRequired,
		handlerNodeFocused: PropTypes.func.isRequired,
		handlerNodeLostFocus: PropTypes.func.isRequired,
		handlerViewport: PropTypes.func.isRequired,
		graphManaged: PropTypes.bool.isRequired,
		graphAnimated: PropTypes.bool.isRequired,
		graphOperation: PropTypes.string,
		graphManagedEnded: PropTypes.func.isRequired,
		graphAnimatedEnded: PropTypes.func.isRequired,
		graphManagedAddEdge: PropTypes.func.isRequired,
		graphManagedRemoveNode: PropTypes.func.isRequired,
		graphManagedRemoveEdge: PropTypes.func.isRequired,
		graphManagedAlgorithm: PropTypes.func.isRequired,
		graphManagedAlgorithmEnded: PropTypes.func.isRequired,
		graphManagedCompete: PropTypes.func.isRequired,
		graphNodeRoot: PropTypes.func.isRequired,
		master: PropTypes.bool
	};

	return WithCompete;
};

export default withCompete;
