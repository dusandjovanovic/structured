import React from "react";
import Master from "../../containers/room/toolbar/toolbar-master/master";
import Spectator from "../../containers/room/toolbar/toolbar-spectator/spectator";
import Wrapper from "../wrapper/wrapper";
import PropTypes from "prop-types";

const withPlayground = WrappedComponent => {
    const withPlayground = class extends React.Component {
        componentDidMount() {
            if (this.props.username !== this.props.data.createdBy) {
                this.props.getGraphIO();
                this.props.socket.on(this.props.username, received => {
                    this.props.initiateGraph(received.graph);
                });
                this.props.socket.on(
                    this.props.room.name + " graph change",
                    received => {
                        this.props.initiateGraph(received.graph);
                    }
                );
            } else if (this.props.username === this.props.data.createdBy) {
                this.props.socket.on(this.props.data.createdBy, received => {
                    this.props.addGraphIO(
                        received.username,
                        this.props.visualization
                    );
                    if (this.props.graphOperation === "GRAPH_MANAGED_ALGORITHM")
                        this.props.algorithmBeginIO(
                            this.props.algorithmType,
                            this.props.algorithmVisualization.states,
                            this.props.nodeRoot
                        );
                });
            }

            this.props.socket.on(
                this.props.room.name + " master changed",
                received => {
                    this.props.roomGetData(
                        this.props.room.name,
                        this.props.username
                    );
                    this.props.internalNotificationsAdd(
                        received.msg,
                        "warning"
                    );
                }
            );
            this.props.socket.on(
                this.props.room.name + " join and leave room",
                received => {
                    this.props.roomGetData(
                        this.props.room.name,
                        this.props.username
                    );
                    this.props.internalNotificationsAdd(received.msg, "info");
                }
            );

            this.props.socket.on(
                this.props.room.name + " add node",
                received => {
                    this.props.addReceivedNode(received.node);
                }
            );
            this.props.socket.on(
                this.props.room.name + " remove node",
                received => {
                    this.props.removeReceivedNode(received.node);
                }
            );
            this.props.socket.on(
                this.props.room.name + " add edge",
                received => {
                    this.props.addReceivedEdge(
                        received.edge.source,
                        received.edge.target
                    );
                }
            );
            this.props.socket.on(
                this.props.room.name + " remove edge",
                received => {
                    this.props.removeReceivedEdge(
                        received.edge.source,
                        received.edge.target
                    );
                }
            );

            this.props.joinLeaveRoomIO(
                this.props.room.name,
                this.props.username + " joined the room."
            );
        }

        componentDidUpdate(prevProps) {
            if (
                this.props.room.master &&
                this.props.room.master !== prevProps.room.master
            ) {
                this.props.socket.on(this.props.username, received => {
                    this.props.addGraphIO(
                        received.username,
                        this.props.visualization
                    );
                    if (this.props.graphOperation === "GRAPH_MANAGED_ALGORITHM")
                        this.props.algorithmBeginIO(
                            this.props.algorithmType,
                            this.props.algorithmVisualization.states,
                            this.props.nodeRoot
                        );
                });
                this.props.socket.off(this.props.room.name + " graph change");
                this.props.socket.off(this.props.room.name + " delete room");
            }
        }

        render() {
            return (
                <Wrapper>
                    {this.props.room.master ? (
                        <WrappedComponent {...this.props}>
                            <Master
                                randomGraph={this.props.randomGraph}
                                addNode={this.props.addNode}
                                removeNode={this.props.graphManagedRemoveNode}
                                addEdge={this.props.graphManagedAddEdge}
                                removeEdge={this.props.graphManagedRemoveEdge}
                                algorithmBegin={this.props.algorithmBegin}
                                algorithmCanceled={this.props.algorithmCanceled}
                                disabled={this.props.algorithm}
                                leaveRoomIOInit={this.props.leaveRoomIOInit}
                                deleteRoomIOInit={this.props.deleteRoomIOInit}
                            />
                        </WrappedComponent>
                    ) : (
                        <WrappedComponent {...this.props}>
                            <Spectator
                                addNode={this.props.addNode}
                                removeNode={this.props.graphManagedRemoveNode}
                                addEdge={this.props.graphManagedAddEdge}
                                removeEdge={this.props.graphManagedRemoveEdge}
                                disabled={this.props.algorithm}
                                leaveRoomIOInit={this.props.leaveRoomIOInit}
                            />
                        </WrappedComponent>
                    )}
                </Wrapper>
            );
        }
    };

    withPlayground.displayName = "withPlayground";

    withPlayground.propTypes = {
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

        addNodeIO: PropTypes.func,
        addEdgeIO: PropTypes.func,
        removeNodeIO: PropTypes.func,
        removeEdgeIO: PropTypes.func,
        addGraphIO: PropTypes.func,
        getGraphIO: PropTypes.func,
        changeGraphIO: PropTypes.func,
        competeBeginIO: PropTypes.func,
        competeEndedIO: PropTypes.func,
        algorithmBeginIO: PropTypes.func,
        algorithmEndedIO: PropTypes.func,
        joinLeaveRoomIO: PropTypes.func,
        deleteRoomIO: PropTypes.func,
        masterChangedIO: PropTypes.func,
        socket: PropTypes.object,
        rediret: PropTypes.bool.isRequired,
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

        algorithm: PropTypes.bool.isRequired,
        algorithmBegin: PropTypes.func.isRequired,
        algorithmCanceled: PropTypes.func.isRequired,
        algorithmNextState: PropTypes.func.isRequired,
        algorithmPreviousState: PropTypes.func.isRequired,
        algorithmVisualize: PropTypes.func.isRequired,
        algorithmPause: PropTypes.func.isRequired,
        algorithmVisualization: PropTypes.object.isRequired,
        algorithmState: PropTypes.object.isRequired,
        algorithmActive: PropTypes.bool.isRequired,
        algorithmType: PropTypes.string.isRequired
    };

    return withPlayground;
};

export default withPlayground;
