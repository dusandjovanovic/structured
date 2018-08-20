import React from 'react';
import Master from '../../containers/room/toolbar/toolbar-master/master';
import Spectator from '../../containers/room/toolbar/toolbar-spectator/spectator'
import Wrapper from '../wrapper/wrapper';

function withPlayground (WrappedComponent) {
    return class extends React.Component {
        componentDidMount() {
            if (this.props.username !== this.props.data.createdBy) {
                this.props.getGraphIO();
                this.props.socket.on(this.props.username, received => {
                    this.props.initiateGraph(received.graph);
                });
                this.props.socket.on(this.props.room + ' graph change', received => {
                    this.props.initiateGraph(received.graph);
                });
            }
            else if (this.props.username === this.props.data.createdBy) {
                this.props.socket.on(this.props.data.createdBy, (received) => {
                    this.props.addGraphIO(received.username, this.props.visualization);
                });
            }

            this.props.socket.on(this.props.room.name + ' master changed', received => {
                this.props.roomGetData(this.props.room.name, this.props.room.username);
                this.props.notificationSystem(received.msg, "warning", 10, null, null);
            });

            this.props.socket.on(this.props.room.name + ' join and leave room', received => {
                this.props.roomGetData(this.props.room.name, this.props.room.username);
                this.props.notificationSystem(received.msg, "warning", 10, null, null);
            });

            this.props.socket.on(this.props.room.name + ' add node', received => {
                this.props.addReceivedNode(received.node);
            });
            this.props.socket.on(this.props.room.name + ' remove node', received => {
                this.props.removeReceivedNode(received.node);
            });
            this.props.socket.on(this.props.room.name + ' add edge', received => {
                this.props.addReceivedEdge(received.edge.source, received.edge.target);
            });
            this.props.socket.on(this.props.room.name + ' remove edge', received => {
                this.props.removeReceivedEdge(received.edge.source, received.edge.target);
            });
        };

        render() {
            return (
                <Wrapper>
                {this.props.room.master
                    ? <WrappedComponent {...this.props}>
                        <Master randomGraph={this.props.randomGraph}
                                addNode={this.props.addNode}
                                removeNode={this.props.graphManagedRemoveNode}
                                addEdge={this.props.graphManagedAddEdge}
                                removeEdge={this.props.graphManagedRemoveEdge}
                                algorithmBreadth={this.props.algorithmBreadth}
                                algorithmDepth={this.props.algorithmDepth}
                                algorithmCanceled={this.props.algorithmCanceled}
                                disabled={this.props.algorithm}
                        />
                      </WrappedComponent>
                    : <WrappedComponent {...this.props}>
                        <Spectator addNode={this.props.addNode}
                                   removeNode={this.props.graphManagedRemoveNode}
                                   addEdge={this.props.graphManagedAddEdge}
                                   removeEdge={this.props.graphManagedRemoveEdge}
                                   disabled={this.props.algorithm}
                        />
                      </WrappedComponent>
                }
                </Wrapper>
            )
        };
    }
}

export default withPlayground;