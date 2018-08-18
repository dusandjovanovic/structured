import React from 'react';
import Compete from '../../containers/room/compete/compete';
import CompeteSpectator from '../../containers/room/compete/competeSpectator';
import Wrapper from '../wrapper/wrapper';

const COMPETE_BREADTH = 'COMPETE_BREADTH';
const COMPETE_DEPTH = 'COMPETE_DEPTH';

function withCompetitive (WrappedComponent) {
    return class extends React.Component {
        state = {
            competeType: COMPETE_BREADTH,
            graph: [],
            score: 0
        };

        componentDidMount() {
            if (this.props.username !== this.props.data.createdBy) {
                this.props.getGraphIO();
                this.props.socket.on(this.props.username, received => {
                    if (!this.props.graphManaged)
                        this.props.initiateGraph(received.graph);
                });
            }
            else if (this.props.username === this.props.data.createdBy) {
                this.props.socket.on(this.props.data.createdBy, (received) => {
                    this.props.addGraphIO(received.username, this.props.visualization);
                });
            }

            this.props.socket.on('compete begin', received => {
                this.competeBegan(received.algorithmType, received.root);
            });

            this.props.socket.on('compete ended', received => {
                this.competeEndedByFriend(received.username, received.score);
            });
        };

        competeBegin = () => {
            let graphTraversed = this.props.graph.bfs(this.props.nodeRoot);
            this.setState({
                graph: graphTraversed
            });
            this.props.graphManagedCompete();
            this.props.roomChangeGraph(this.props.room.name, graphTraversed)
                .then(response => {
                    this.props.competeBeginIO(this.state.competeType, this.props.nodeRoot);
                });
        };

        competeBegan = (algorithm, root) => {
            if (!this.props.graphManaged) {
                this.props.graphNodeRoot(root);
                this.props.graphManagedCompete();
                this.props.roomGetGraph(this.props.room.name)
                    .then(response => {
                        this.setState({
                            competeType: algorithm,
                            graph: this.props.room.data.graph,
                            score: 0
                        });
                    });
            }
        };

        competeEnded = () => {
            this.props.graphManagedEnded();
            this.props.competeEndedIO(this.state.score);
            if (!this.props.master)
                this.props.getGraphIO();
        };

        competeEndedByFriend = (username, score) => {
            this.props.notificationPush("Your friend " + username + " just finished the competition. With the overall score of " + score + ".", "info", 10, null, null);
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
                    {this.props.room.master
                        ? <WrappedComponent competitive {...this.props}>
                            <Compete randomGraph={this.props.randomGraph}
                                     competeBegin={this.competeBegin}
                                     competeEnded={this.competeEnded}
                                     competeEndedByFriend={this.competeEndedByFriend}
                                     competeBreadth={this.competeBreadth}
                                     competeDepth={this.competeDepth}
                                     graphManaged={this.props.graphManaged}
                                     graphExists={this.props.visualization.nodes.length > 0}
                                     competeType={this.state.competeType}
                            />
                          </WrappedComponent>
                        : <WrappedComponent competitive {...this.props}>
                            <CompeteSpectator competeEnded={this.competeEnded}
                                              graphManaged={this.props.graphManaged}
                                              competeType={this.state.competeType}
                            />
                          </WrappedComponent>
                    }
                </Wrapper>
            )
        };
    }
}

export default withCompetitive;