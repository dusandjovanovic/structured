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

            this.props.socket.on(this.props.room.name + ' toolbar-compete begin', received => {
                this.competeBegan(received.agName, received.root);
            });

            this.props.socket.on('toolbar-compete end', received => {
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
            if (!this.props.graphManaged) {
                this.props.roomGetGraph(this.props.room.name)
                    .then(response => {
                        this.setState({
                            competeType: algorithm,
                            graph: response.data,
                        });
                        this.props.graphNodeRoot(root);
                        this.props.graphManagedCompete();
                        this.props.notificationPush("A room Master just started a toolbar-compete session. Submit your solution when ready!", "warning", 10, null, null);
                    });
            }
        };

        competeEnded = () => {
            let scored = 0;
            for (let index in this.props.nodesHighlighted) {
                if (typeof this.state.graph[index] !== 'undefined')
                    scored += (this.props.nodesHighlighted[index] === this.state.graph[index]
                        ? 10
                        : 1
                    );
            }
            this.props.graphManagedEnded();
            this.props.competeEndedIO(scored);
            this.props.userCompeteScore(this.props.username, scored);
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

        competeHelp = () => {
            return (
                <div>
                    <strong>Depth-first search</strong>
                    <br />
                    A depth-first search (DFS) is an algorithm for <em>traversing a finite graph</em>. DFS visits the child vertices before visiting the sibling vertices; that is, it traverses the <em>depth of any particular path before exploring its breadth</em>. A stack (often the program's call stack via recursion) is generally used when implementing the algorithm.
                    <mark>The algorithm begins with a chosen root vertex; it then iteratively transitions from the current vertex to an adjacent, unvisited vertex, until it can no longer find an unexplored vertex to transition to from its current location.</mark> The algorithm then backtracks along previously visited vertices, until it finds a vertex connected to yet more uncharted territory. It will then proceed down the new path as it had before, backtracking as it encounters dead-ends, and ending only when the algorithm has backtracked past the original "root" vertex from the very first step.
                    DFS is the basis for many graph-related algorithms, including topological sorts and planarity testing.
                    <br />
                    <code>
                        1 procedure DFS(G, v):<br />
                        2     label v as explored<br />
                        3     for all edges e in G.incidentEdges(v) do<br />
                        4         if edge e is unexplored then<br />
                        5             w ← G.adjacentVertex(v, e)<br />
                        6             if vertex w is unexplored then<br />
                        7                 label e as a discovered edge<br />
                        8                 recursively call DFS(G, w)<br />
                        9             else<br />
                        10               label e as a back edge<br />
                    </code>
                    <hr />
                    <strong>Breadth-first search</strong>
                    <br />
                    A breadth-first search (BFS) is another technique for traversing a finite graph. BFS visits the neighbor vertices before visiting the child vertices, and a queue is used in the search process. This algorithm is often used to find the shortest path from one vertex to another.
                    <br />
                    <code>
                        1 procedure BFS(G, v):<br />
                        2     create a queue Q<br />
                        3     enqueue v onto Q<br />
                        4     mark v<br />
                        5     while Q is not empty:<br />
                        6         t ← Q.dequeue()<br />
                        7         if t is what we are looking for:<br />
                        8             return t<br />
                        9         for all edges e in G.adjacentEdges(t) do<br />
                        12            o ← G.adjacentVertex(t, e)<br />
                        13            if o is not marked:<br />
                        14                mark o<br />
                        15                enqueue o onto Q<br />
                        16     return null<br />
                    </code>
                    <br />
                    <footer className="blockquote-footer">as said on <cite title="Source Title">Wikipedia</cite></footer>
                </div>
            );
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
                                              competeHelp={this.competeHelp}
                            />
                          </WrappedComponent>
                    }
                </Wrapper>
            )
        };
    }
}

export default withCompetitive;