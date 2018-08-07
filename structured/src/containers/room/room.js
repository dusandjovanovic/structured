import React, {Component} from 'react';
import { connect } from 'react-redux';
import Graph from '../../components/visualization/graph/graph';
import Chat from './chat/chat';
import Navbar from './navbar/navbar';
import randomData from '../../utils/graph-module/graph.random';
import Overlay from '../../components/user-interface/spinner-overlay/spinnerOverlay';
import {graphFactory} from '../../utils/graph-module/graph.module';
import {Redirect, withRouter} from "react-router-dom";
import { Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import * as actions from "../../redux/actions";
import './room.css';

import socketIo from '../../components-higher/socketio/socketio';

class Room extends Component {
    socket = null;
    graph = new graphFactory();
    state = {
        redirect: false,
        nodes: [],
        edges: []
    };

    constructor(props) {
        super(props);
        this.socket = this.props.socketio('http://localhost:2998/graph');

        if (this.props.username !== this.props.data.createdBy) {
            this.socket.on(this.props.username, graph => {
                console.log(graph);
                this.initiateGraph(graph.graph)
            });

            this.socket.on(this.props.room.name + ' add node', message => {
                this.addNewNode(message.node)
            });

            this.socket.emit('get graph', {
                username: this.props.username,
                masterName: this.props.data.createdBy
            });
        }
        else if (this.props.username === this.props.data.createdBy)
            this.socket.on(this.props.data.createdBy, (received) => {
                let nodes = [];
                this.state.nodes.map(element => {
                    return nodes.push({
                        key: element.key
                    });
                });

                let edges = [];
                this.state.edges.map(element => {
                    return edges.push({
                        source: element.source.key,
                        target: element.target.key
                    });
                });

                this.socket.emit('graph', {
                    username: received.username,
                    graph: {
                        nodes: nodes,
                        edges: edges
                    }
                })
            });
    }

    initiateGraph = (graph) => {
        this.graph = new graphFactory();
        graph.nodes.map(node => {
            return this.graph.addVertex(node.key);
        });
        graph.edges.map(edge => {
            return this.graph.addEdge(edge.source, edge.target);
        });
        this.setState({
            nodes: this.graph.nodes,
            edges: this.graph.edges
        });
    };

    randomGraph = () => {
        let randomGraph = randomData(this.graph.nodes, this.graphWidth, this.graphHeight);
        this.initiateGraph(randomGraph);
    };

    addNewNode = (node) => {
        this.graph.addVertex(node);
        this.setState({
            nodes: this.graph.nodes
        });
    };

    addNode = () => {
        let added = this.graph.addVertexRandom();
        this.setState({
            nodes: this.graph.nodes
        });
        this.socket.emit('add node', {
            room: this.props.room.name,
            sender: this.props.username,
            node: added
        });
    };

    deleteRoom = () => {
        this.props.roomDeleteExisting(this.props.data._id);
        this.setState({
            redirect: true
        });
    };

    leaveRoom = () => {
        this.props.roomLeaveExisting(this.props.room.name, this.props.username);
        this.setState({
            redirect: true
        });
    };

    render() {
        let waiting = null;
        if (this.props.waiting)
            waiting = <Overlay />;
        else if (this.state.redirect)
            waiting = <Redirect to="/" />;

        return (
                <div className="room">
                    {waiting}
                    <Navbar deleteRoom={() => this.deleteRoom()}
                            leaveRoom={() => this.leaveRoom()}
                            room={this.props.room}
                    />

                    <Container fluid>
                        <Row>
                            <Col md="3" className="sidebar d-none d-md-block bg-light">
                                <div className="sidebar-sticky">
                                    <Chat room={this.props.room.name} username={this.props.username} />
                                </div>
                            </Col>

                            <Col md="9" className="ml-sm-auto pt-3 px-4">
                                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                                    <h3>Playground</h3>
                                    <div className="btn-toolbar mb-2 mb-md-0">
                                        <div className="btn-group mr-2">
                                            <Button className="btn btn-outline-secondary" onClick={() => this.randomGraph()}>Random graph ↺</Button>
                                            <Button className="btn btn-outline-secondary" onClick={() => this.addNode()}>Add node ↳</Button>
                                            <Button className="btn btn-outline-secondary" onClick={null}>Add edge ↯</Button>
                                        </div>
                                        <button className="btn btn-outline-secondary dropdown-toggle">
                                            Algorithms
                                        </button>
                                    </div>
                                </div>
                                <Graph width={700}
                                       height={500}
                                       managed={false}
                                       nodes={this.state.nodes}
                                       edges={this.state.edges} />
                            </Col>
                        </Row>
                    </Container>
                </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        data: state.room.data,
        room: state.room.room
    }
};

const mapDispatchToProps = dispatch => {
    return {
        roomLeaveExisting: (name, username) => dispatch(actions.roomLeaveExisting(name, username)),
        roomDeleteExisting: (roomId) => dispatch(actions.roomDeleteExisting(roomId))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (socketIo(Room)));