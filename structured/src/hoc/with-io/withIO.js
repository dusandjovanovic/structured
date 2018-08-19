import React from 'react';

function withIO (WrappedComponent) {
    return class extends React.Component {
        socket = null;

        componentWillMount() {
            this.socket = this.props.io('http://localhost:2998/graph');
            this.socket.on('connect', () => {
                // console.log(this.props.username, 'websocket::opened');
            });
            this.socket.on('disconnect', () => {
                // console.log(this.props.username, 'websocket::closed');
            })
        }

        componentWillUnmount() {
            this.socket.close();
        }

        addNodeIO = (node) => {
            this.socket.emit('add node', {
                room: this.props.data.name,
                sender: this.props.username,
                node: node
            });
        };

        addEdgeIO = (source, target) => {
            this.socket.emit('add edge', {
                room: this.props.data.name,
                sender: this.props.username,
                edge: {
                    source: source,
                    target: target
                }
            });
        };

        removeNodeIO = (node) => {
            this.socket.emit('remove node', {
                room: this.props.data.name,
                sender: this.props.username,
                node: node
            });
        };

        removeEdgeIO = (source, target) => {
            this.socket.emit('remove edge', {
                room: this.props.data.name,
                sender: this.props.username,
                edge: {
                    source: source,
                    target: target
                }
            });
        };

        addGraphIO = (receiver, graph) => {
            if (graph) {
                this.socket.emit('graph', {
                    room: this.props.room.name,
                    username: receiver,
                    graph: graph
                })
            }
        };

        getGraphIO = () => {
            this.socket.emit('get graph', {
                username: this.props.username,
                masterName: this.props.data.createdBy
            });
        };

        competeBeginIO = (algorithmName, rootNode) => {
            this.socket.emit('compete begin', {
                room: this.props.room.name,
                agName: algorithmName,
                root: rootNode
            });
        };

        competeEndedIO = (score) => {
            this.socket.emit('compete end', {
                room: this.props.room.name,
                user: this.props.username,
                score: score
            });
        };

        render() {
            return (
                <WrappedComponent addNodeIO={this.addNodeIO}
                                  addEdgeIO={this.addEdgeIO}
                                  removeNodeIO={this.removeNodeIO}
                                  removeEdgeIO={this.removeEdgeIO}
                                  addGraphIO={this.addGraphIO}
                                  getGraphIO={this.getGraphIO}
                                  competeBeginIO={this.competeBeginIO}
                                  competeEndedIO={this.competeEndedIO}
                                  socket={this.socket}
                                  {...this.props}
                                />
            );
        }
    }
};

export default withIO;