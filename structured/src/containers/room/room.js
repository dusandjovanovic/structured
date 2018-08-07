import React, {Component} from 'react';
import { connect } from 'react-redux';
import Graph from '../../components/visualization/graph/graph';
import Chat from './chat/chat';
import randomData from '../../utils/graph-module/graph.random';
import {graphFactory} from '../../utils/graph-module/graph.module';
import {withRouter} from "react-router-dom";
import { Nav, NavItem, NavLink, Navbar, Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import * as actions from "../../redux/actions";
import './room.css';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:2998/graph');

class Room extends Component {
    graphWidth = 800;
    graphHeight = 600;
    graph = new graphFactory();
    state = {
        nodes: [],
        edges: []
    };

    componentWillReceiveProps(newProps) {
        if (newProps.room.name !== this.props.room.name) {

            if (this.props.username !== newProps.room.createdBy) {
                socket.on(this.props.username, graph => {
                    console.log('receivedGraph', graph);
                    this.initiateGraph(graph)
                });
                socket.on(newProps.room.name + ' add node', message => {
                    console.log('received', message);
                    this.addNewNode(message.node)
                });

                socket.emit('get graph', {
                    username: this.props.username,
                    masterName: newProps.room.createdBy
                });
            }
            else if (this.props.username === newProps.room.createdBy)
                socket.on(newProps.room.createdBy, (received) => {
                    console.log('emit!', received);
                    socket.emit('graph', {
                        username: received.username,
                        graph: this.state
                    })
                });
        }

    };

    componentDidMount() {

    };

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
        socket.emit('add node', {
            room: this.props.room.name,
            sender: this.props.username,
            node: added
        });
    };

    deleteRoom = (event) => {
        this.props.roomDeleteExisting(this.props.roomId);
        this.props.history.push("/");
    };

    leaveRoom = (event) => {
        this.props.roomLeaveExisting(this.props.room.name, this.props.username);
        this.props.history.push("/");
    };

    render() {
        return (
            <div>
                <Nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                    <NavItem>
                        <NavLink className="navbar-brand" href="#">Graph room</NavLink>
                    </NavItem>

                    <Navbar className="px-3">
                        {this.props.room.master
                            ? (
                                <NavItem className="text-nowrap">
                                    <NavLink className="nav-link text-danger"
                                             onClick={() => this.deleteRoom()}
                                             href="#">Delete room</NavLink>
                                </NavItem>
                            )
                            : null
                        }
                        <NavItem className="text-nowrap">
                            <NavLink className="nav-link text-secondary"
                                     onClick={() => this.leaveRoom()}
                                     href="#">Leave room</NavLink>
                        </NavItem>
                    </Navbar>
                </Nav>
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
                            <Graph width={this.graphWidth}
                                   height={this.graphHeight}
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
        room: state.room.room,
        roomId: state.room.data._id
    }
};

const mapDispatchToProps = dispatch => {
    return {
        roomLeaveExisting: (name, username) => dispatch(actions.roomLeaveExisting(name, username)),
        roomDeleteExisting: (roomId) => dispatch(actions.roomDeleteExisting(roomId))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Room));