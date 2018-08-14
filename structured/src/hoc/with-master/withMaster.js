import React from 'react';
import Master from '../../containers/room/master/master';
import Spectator from '../../containers/room/spectator/spectator'
import Wrapper from '../wrapper/wrapper';

function withMaster (WrappedComponent) {
    return class extends React.Component {
        render() {
            return (
                <Wrapper>
                {this.props.room.master
                    ? <WrappedComponent {...this.props}>
                        <Master randomGraph={this.props.randomGraph}
                                addNode={this.props.addNode}
                                removeNode={this.props.managedRemoveNodeHandler}
                                addEdge={this.props.managedAddEdgeHandler}
                                removeEdge={this.props.managedRemoveEdgeHandler}
                                algorithmBreadth={this.props.algorithmBreadth}
                                algorithmDepth={this.props.algorithmDepth}
                                algorithmCanceled={this.props.algorithmCanceled}
                                disabled={this.props.algorithm}
                        />
                      </WrappedComponent>
                    : <WrappedComponent {...this.props}>
                        <Spectator addNode={this.props.addNode}
                                   removeNode={this.props.managedRemoveNodeHandler}
                                   addEdge={this.props.managedAddEdgeHandler}
                                   removeEdge={this.props.managedRemoveEdgeHandler}
                                   disabled={this.props.algorithm}
                        />
                      </WrappedComponent>
                }
                </Wrapper>
            )
        };
    }
}

export default withMaster;