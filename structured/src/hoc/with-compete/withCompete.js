import React from "react";
import Compete from "../../containers/room/toolbar/toolbar-compete/compete";
import CompeteSpectator from "../../containers/room/toolbar/toolbar-compete/competeSpectator";
import Wrapper from "../wrapper/wrapper";

import { COMPETE_BREADTH, COMPETE_DEPTH } from "../../utils/constants";

/* eslint react/display-name: 0 */

const withCompete = WrappedComponent => {
    return class extends React.Component {
        state = {
            competeType: COMPETE_BREADTH,
            graph: []
        };

        componentDidMount() {
            if (this.props.username !== this.props.data.createdBy) {
                this.props.getGraphIO();
                this.props.socket.on(this.props.username, received => {
                    if (!this.props.graphManaged)
                        this.props.initiateGraph(received.graph);
                });
                this.props.socket.on(
                    this.props.room.name + " graph change",
                    received => {
                        this.props.initiateGraph(received.graph);
                    }
                );
            } else if (this.props.username === this.props.data.createdBy) {
                this.props.socket.on(this.props.username, received => {
                    this.props.addGraphIO(
                        received.username,
                        this.props.visualization
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
                this.props.room.name + " compete begin",
                received => {
                    this.competeInitiate(received.agName, received.root);
                }
            );
            this.props.socket.on(
                this.props.room.name + " compete end",
                received => {
                    this.competeEndedByFriend(received.user, received.score);
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
                });
                this.props.socket.off(this.props.room.name + " graph change");
                this.props.socket.off(this.props.room.name + " delete room");
            }
        }

        competeBegin = () => {
            let graphTraversed = this.props.graph.algorithm(
                this.props.nodeRoot,
                this.state.competeType
            );
            this.setState({
                graph: graphTraversed
            });
            this.props.graphManagedCompete();
            this.props
                .roomChangeGraph(this.props.room.name, graphTraversed)
                .then(response => {
                    this.props.competeBeginIO(
                        this.state.competeType,
                        this.props.nodeRoot
                    );
                });
        };

        competeInitiate = (algorithm, root) => {
            this.props.internalNotificationsAdd(
                (this.props.room.master ? "You" : "A room Master").concat(
                    " just started a compete session. Submit your solution when ready!"
                ),
                "warning"
            );
            if (!this.props.graphManaged) {
                this.props.roomGetGraph(this.props.room.name).then(response => {
                    this.props.graphManagedCompete();
                    this.props.graphNodeRoot(root);
                    this.setState({
                        competeType: algorithm,
                        graph: response.data
                    });
                });
            }
        };

        competeEnded = () => {
            let scored = 0;
            for (let index in this.props.nodesHighlighted)
                if (typeof this.state.graph[index] !== "undefined")
                    scored +=
                        this.props.nodesHighlighted[index] ===
                        this.state.graph[index]
                            ? 100 / this.state.graph.length
                            : 0;
            this.props.competeEndedIO(scored);
            this.props.userHistoryAdd(scored);
            this.props.graphManagedEnded();
            if (!this.props.master) this.props.getGraphIO();
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
                <Wrapper>
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
                            />
                        </WrappedComponent>
                    ) : (
                        <WrappedComponent competitive {...this.props}>
                            <CompeteSpectator
                                competeEnded={this.competeEnded}
                                graphManaged={this.props.graphManaged}
                                competeType={this.state.competeType}
                            />
                        </WrappedComponent>
                    )}
                </Wrapper>
            );
        }
    };
};

export default withCompete;
