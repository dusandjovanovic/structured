import React from 'react';
import Compete from '../../containers/room/toolbar/toolbar-compete/compete';
import CompeteSpectator from '../../containers/room/toolbar/toolbar-compete/competeSpectator';
import Wrapper from '../wrapper/wrapper';

const COMPETE_BREADTH = 'COMPETE_BREADTH';
const COMPETE_DEPTH = 'COMPETE_DEPTH';

function withCompetitive (WrappedComponent) {
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
            }
            else if (this.props.username === this.props.data.createdBy) {
                this.props.socket.on(this.props.data.createdBy, (received) => {
                    this.props.addGraphIO(received.username, this.props.visualization);
                });
            }

            this.props.socket.on(this.props.room.name + ' compete begin', received => {
                this.competeBegan(received.agName, received.root);
            });

            this.props.socket.on('compete end', received => {
                this.competeEndedByFriend(received.user, received.score);
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
            this.props.notificationSystem((this.props.room.master ? 'You' : 'A room Master').concat(" just started a compete session. Submit your solution when ready!"), "warning", 10, null, null);
            if (!this.props.graphManaged) {
                this.props.graphNodeRoot(root);
                this.props.graphManagedCompete();
                this.props.roomGetGraph(this.props.room.name)
                    .then(response => {
                        this.setState({
                            competeType: algorithm,
                            graph: response.data,
                        });
                    });
            }
        };

        competeEnded = () => {
            let scored = 0;
            for (let index in this.props.nodesHighlighted)
                if (typeof this.state.graph[index] !== 'undefined')
                    scored += (this.props.nodesHighlighted[index] === this.state.graph[index] ? 10 : 1);
            this.props.graphManagedEnded();
            this.props.competeEndedIO(scored);
            this.props.userCompeteScore(this.props.username, scored);
            if (!this.props.master)
                this.props.getGraphIO();
        };

        competeEndedByFriend = (username, score) => {
            this.props.notificationSystem(username + " just finished the competition. With the overall score of " + score + "points.", "info", 10, null, null);
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