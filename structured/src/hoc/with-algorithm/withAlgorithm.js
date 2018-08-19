import React from 'react';

const ALGORITHM_BREADTH = 'ALGORITHM_BREADTH';
const ALGORITHM_DEPTH = 'ALGORITHM_DEPTH';

function withAlgorithm (WrappedComponent) {
    return class extends React.Component {
        state = {
            algorithm: false,
            algorithmType: ALGORITHM_BREADTH
        };

        componentDidMount() {
            this.props.socket.on(this.props.room.name + ' algorithm begin', received => {
                this.algorithmBegin(received.agName, received.root);
            });
            this.props.socket.on(this.props.room.name + ' algorithm end', received => {
                this.algorithmEnded();
            });
        };

        algorithmBreadth = (root) => {
            this.props.graphNodeRoot(root);
            this.props.graphManagedAlgorithm();
            this.setState({
                algorithm: true
            });
        };

        algorithmDepth = (root) => {
            this.props.graphNodeRoot(root);
            this.props.graphManagedAlgorithm();
            this.setState({
                algorithm: true
            });
        };

        algorithmCanceled = () => {
            this.props.graphManagedAlgorithmEnded();
            this.props.algorithmEndedIO();
            this.setState({
                algorithm: false
            });
        };

        algorithmBegin = (algorithmType, root) => {
            this.props.notificationSystem((this.props.room.master ? 'You' : 'A room Master').concat(" just started an algorithm visualization."), "warning", 10, null, null);
            if (!this.props.graphManaged) {
                switch (algorithmType) {
                    case ALGORITHM_BREADTH:
                        this.algorithmBreadth(root);
                        break;
                    case ALGORITHM_DEPTH:
                        this.algorithmDepth(root);
                        break;
                    default:
                        return;
                }
            }
        };

        algorithmEnded = () => {
            this.props.graphManagedAlgorithmEnded();
            this.setState({
                algorithm: false
            });
        };

        render() {
            return (
                <WrappedComponent algorithm={this.state.algorithm}
                                  algorithmBreadth={this.algorithmBreadth}
                                  algorithmDepth={this.algorithmDepth}
                                  algorithmCanceled={this.algorithmCanceled}
                                  {...this.props}
                />
            );
        };
    }
}

export default withAlgorithm;