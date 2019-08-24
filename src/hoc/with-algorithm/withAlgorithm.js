import React from "react";
import { interval } from "rxjs";
import { takeWhile } from "rxjs/operators";
import PropTypes from "prop-types";

import { ALGORITHM_BREADTH } from "../../utils/constants";

const withAlgorithm = WrappedComponent => {
	class WithAlgorithm extends React.Component {
		state = {
			algorithm: false,
			algorithmType: ALGORITHM_BREADTH,
			algorithmState: {
				active: false,
				currentState: null,
				current: 0,
				states: []
			}
		};

		componentDidMount = () => {
			if (this.props.username !== this.props.data.createdBy) {
				this.props.socket.on("algorithmEnd", () => {
					this.algorithmEnded();
				});
			}
			this.props.socket.on("algorithmBegin", received => {
				this.algorithmInitiate(
					received.agName,
					received.agIterations,
					received.root
				);
			});
		};

		componentDidUpdate(prevProps) {
			if (
				this.props.room.master &&
				this.props.room.master !== prevProps.room.master
			) {
				this.props.socket.off("algorithmEnd");
			}
		}

		algorithmNextState = () => {
			if (
				this.state.algorithmState.current <
				this.state.algorithmState.states.length
			) {
				this.setState({
					algorithmState: {
						...this.state.algorithmState,
						current: this.state.algorithmState.current + 1,
						currentState: this.state.algorithmState.states[
							this.state.algorithmState.current + 1
						]
					}
				});
			} else {
				this.algorithmPause();
			}
		};

		algorithmPreviousState = () => {
			if (this.state.algorithmState.current > 0) {
				this.setState({
					algorithmState: {
						...this.state.algorithmState,
						current: this.state.algorithmState.current - 1,
						currentState: this.state.algorithmState.states[
							this.state.algorithmState.current - 1
						]
					}
				});
			}
		};

		algorithmVisualize = () => {
			this.setState({
				algorithmState: {
					...this.state.algorithmState,
					active: true
				}
			});
			const source = interval(1000);
			source
				.pipe(takeWhile(() => this.state.algorithmState.active))
				.subscribe(() => this.algorithmNextState());
		};

		algorithmPause = () => {
			this.setState({
				algorithmState: {
					...this.state.algorithmState,
					active: false
				}
			});
		};

		algorithmCanceled = () => {
			this.props.graphManagedAlgorithmEnded();
			this.props.algorithmEndedIO();
			this.setState({
				algorithm: false,
				algorithmState: {
					active: false,
					current: 0,
					currentState: null,
					states: []
				}
			});
		};

		algorithmBegin = algorithmType => {
			let algorithmIterations = this.props.graph.algorithm(
				this.props.nodeRoot,
				algorithmType
			);
			this.props.algorithmBeginIO(
				algorithmType,
				algorithmIterations,
				this.props.nodeRoot
			);
			this.props.graphManagedAlgorithm();
			this.setState(
				{
					algorithm: true,
					algorithmType: algorithmType,
					algorithmState: {
						states: algorithmIterations,
						currentState: algorithmIterations[0],
						current: 0
					}
				},
				() => {
					this.algorithmVisualize();
				}
			);
		};

		algorithmInitiate = (algorithmType, algorithmIterations, root) => {
			if (!this.state.algorithm) {
				this.props.internalNotificationsAdd(
					"A room Master just started an algorithm visualization.",
					"success"
				);
				this.props.graphManagedAlgorithm();
				this.props.graphNodeRoot(root);
				this.setState(
					{
						algorithm: true,
						algorithmType: algorithmType,
						algorithmState: {
							states: algorithmIterations,
							current: 0
						}
					},
					() => {
						this.algorithmVisualize();
					}
				);
			}
		};

		algorithmEnded = () => {
			this.props.internalNotificationsAdd(
				"Algorithm visualization ended. You are able to change the graph again.",
				"warning"
			);
			this.props.graphManagedAlgorithmEnded();
			this.setState({
				algorithm: false,
				algorithmState: {
					active: false,
					current: 0,
					states: []
				}
			});
		};

		render() {
			return (
				<WrappedComponent
					algorithm={this.state.algorithm}
					algorithmBegin={this.algorithmBegin}
					algorithmCanceled={this.algorithmCanceled}
					algorithmNextState={this.algorithmNextState}
					algorithmPreviousState={this.algorithmPreviousState}
					algorithmVisualize={this.algorithmVisualize}
					algorithmPause={this.algorithmPause}
					algorithmVisualization={this.state.algorithmState}
					algorithmState={this.state.algorithmState.currentState}
					algorithmActive={this.state.algorithmState.active}
					algorithmType={this.state.algorithmType}
					{...this.props}
				/>
			);
		}
	}

	WithAlgorithm.propTypes = {
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
		graphNodeRoot: PropTypes.func.isRequired
	};

	return WithAlgorithm;
};

export default withAlgorithm;
