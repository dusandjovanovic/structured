import React from 'react';

function withIO (WrappedComponent) {
    return class extends React.Component {
        socket = null;

        componentWillMount() {
            this.socket = this.props.io('http://localhost:2998/graph');
        }

        addNodeIO = (node) => {
            this.socket.emit('add node', {
                room: this.props.room.name,
                sender: this.props.username,
                node: node
            });
        };

        addEdgeIO = (source, target) => {
            this.socket.emit('add edge', {
                room: this.props.room.name,
                sender: this.props.username,
                source: source,
                target: target
            });
        };

        removeNodeIO = (node) => {
            this.socket.emit('remove node', {
                room: this.props.room.name,
                sender: this.props.username,
                node: node
            });
        };

        removeEdgeIO = (source, target) => {
            this.socket.emit('remove edge', {
                room: this.props.room.name,
                sender: this.props.username,
                source: source,
                target: target
            });
        };

        addGraphIO = (receiver, graph) => {
            this.socket.emit('graph', {
                username: receiver,
                graph: graph
            })
        };

        getGraphIO = () => {
            this.socket.emit('get graph', {
                username: this.props.username,
                masterName: this.props.data.createdBy
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
                                  socket={this.socket}
                                  {...this.props}
                                />
            );
        }
    }
};

export default withIO;