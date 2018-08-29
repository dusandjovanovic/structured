import React from 'react';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

const ALGORITHM_BREADTH = 'ALGORITHM_BREADTH';
const ALGORITHM_DEPTH = 'ALGORITHM_DEPTH';

function withAlgorithm (WrappedComponent) {
    return class extends React.Component {
        state = {
            algorithm: false,
            algorithmType: ALGORITHM_BREADTH,
            algorithmState: {
                active: false,
                currentState: null,
                current: 0,
                states: []
            }
        };

        componentDidMount = () => {
            if (this.props.username !== this.props.data.createdBy) {
                this.props.socket.on(this.props.room.name + ' algorithm end', received => {
                    this.algorithmEnded();
                });
            }
            this.props.socket.on(this.props.room.name + ' algorithm begin', received => {
                console.log(received);
                this.algorithmInitiate(received.agName, received.agIterations, received.root);
            });
        };

        componentDidUpdate(prevProps) {
            if (this.props.room.master && this.props.room.master !== prevProps.room.master) {
                this.props.socket.off(this.props.room.name + ' algorithm end');
            }
        };

        algorithmNextState = () => {
            if (this.state.algorithmState.current < this.state.algorithmState.states.length) {
                this.setState({
                    algorithmState: {
                        ...this.state.algorithmState,
                        current: this.state.algorithmState.current + 1,
                        currentState: this.state.algorithmState.states[this.state.algorithmState.current + 1]
                    }
                });
            }
            else {
                this.algorithmPause();
            }
        };

        algorithmPreviousState = () => {
            if (this.state.algorithmState.current > 0) {
                this.setState({
                    algorithmState: {
                        ...this.state.algorithmState,
                        current: this.state.algorithmState.current - 1,
                        currentState: this.state.algorithmState.states[this.state.algorithmState.current - 1]
                    }
                });
            }
        };

        algorithmVisualize = () => {
            this.setState({
                algorithmState: {
                    ...this.state.algorithmState,
                    active: true
                }
            });
            const source = interval(1000);
            source.pipe(takeWhile(async => this.state.algorithmState.active)).subscribe(async => this.algorithmNextState());
        };

        algorithmPause = () => {
            this.setState({
                algorithmState: {
                    ...this.state.algorithmState,
                    active: false
                }
            });
        };

        algorithmCanceled = () => {
            this.props.graphManagedAlgorithmEnded();
            this.props.algorithmEndedIO();
            this.setState({
                algorithm: false,
                algorithmState: {
                    active: false,
                    current: 0,
                    currentState: null,
                    states: []
                }
            });
        };

        algorithmBegin = (algorithmType) => {
            let algorithmIterations;
            switch (algorithmType) {
                case ALGORITHM_DEPTH:
                    algorithmIterations = this.props.graph.observable(this.props.nodeRoot, ALGORITHM_DEPTH);
                    break;
                default:
                    algorithmIterations = this.props.graph.observable(this.props.nodeRoot, ALGORITHM_BREADTH);
            }
            this.props.algorithmBeginIO(algorithmType, algorithmIterations, this.props.nodeRoot);
            this.props.graphManagedAlgorithm();
            this.setState({
                algorithm: true,
                algorithmType: algorithmType,
                algorithmState: {
                    states: algorithmIterations,
                    currentState: this.state.algorithmState.states[0],
                    current: 0
                }
            });
        };

        algorithmInitiate = (algorithmType, algorithmIterations, root) => {
            if (!this.state.algorithm) {
                this.props.notificationSystem("A room Master just started an algorithm visualization.", "success", 10, null, null);
                this.props.graphManagedAlgorithm();
                this.props.graphNodeRoot(root);
                this.setState({
                    algorithm: true,
                    algorithmType: algorithmType,
                    algorithmState: {
                        states: algorithmIterations,
                        current: 0
                    }
                });
            }
        };

        algorithmEnded = () => {
            this.props.notificationSystem("Algorithm visualization ended. You are able to change the graph again.", "warning", 10, null, null);
            this.props.graphManagedAlgorithmEnded();
            this.setState({
                algorithm: false,
                algorithmState: {
                    active: false,
                    current: 0,
                    states: []
                }
            });
        };

        render() {
            return (
                <WrappedComponent algorithm={this.state.algorithm}
                                  algorithmBegin={this.algorithmBegin}
                                  algorithmCanceled={this.algorithmCanceled}
                                  algorithmNextState={this.algorithmNextState}
                                  algorithmPreviousState={this.algorithmPreviousState}
                                  algorithmVisualize={this.algorithmVisualize}
                                  algorithmPause={this.algorithmPause}
                                  algorithmVisualization={this.state.algorithmState}
                                  algorithmState={this.state.algorithmState.currentState}
                                  algorithmActive={this.state.algorithmState.active}
                                  algorithmType={this.state.algorithmType}
                                  {...this.props}
                />
            );
        };
    }
}

export default withAlgorithm;