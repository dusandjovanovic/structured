import React from 'react';

function withAlgorithm (WrappedComponent) {
    return class extends React.Component {
        state = {
            algorithm: false
        };

        algorithmBreadth = () => {
            this.props.managedAlgorithm();
            this.setState({
                algorithm: true
            });
        };

        algorithmDepth = () => {
            this.props.managedAlgorithm();
            this.setState({
                algorithm: true
            });
        };

        algorithmCanceled = () => {
            this.props.managedAlgorithmCanceled();
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