import React from 'react';
import Master from '../../containers/room/master/master';
import Spectator from '../../containers/room/spectator/spectator'
import Wrapper from '../wrapper/wrapper';

function withPlayground (WrappedComponent) {
    return class extends React.Component {
        componentDidMount() {
            if (this.props.username !== this.props.data.createdBy) {
                this.props.getGraphIO();
                this.props.socket.on(this.props.username, received => {
                    this.props.initiateGraph(received.graph);
                });
            }
            else if (this.props.username === this.props.data.createdBy) {
                this.props.socket.on(this.props.data.createdBy, (received) => {
                    this.props.addGraphIO(received.username, this.props.visualization);
                });
            }

            this.props.socket.on(this.props.data.name + ' add node', received => {
                this.props.addNodeValue(received.node);
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