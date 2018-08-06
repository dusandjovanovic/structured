import React, {Component} from 'react';
import { connect } from 'react-redux';
import Graph from '../../components/visualization/graph/graph';
import Chat from './chat/chat';
import randomData from '../../utils/graph-module/graph.random';
import {graphFactory} from '../../utils/graph-module/graph.module';
import { Nav, NavItem, NavLink, Navbar, Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import './room.css';

class Room extends Component {
    graphWidth = 800;
    graphHeight = 600;
    graph = new graphFactory();
    state = {
        nodes: [],
        edges: []
    };

    componentDidMount() {
        this.randomGraph();
    };

    randomGraph = () => {
        let randomGraph = randomData(this.graph.nodes, this.graphWidth, this.graphHeight);
        this.graph = new graphFactory();
        randomGraph.nodes.map(node => {
            return this.graph.addVertex(node.key);
        });
        randomGraph.edges.map(edge => {
            return this.graph.addEdge(edge.source, edge.target);
        });
        this.setState({
            nodes: this.graph.nodes,
            edges: this.graph.edges
        });
    };

    addNode = () => {
        this.graph.addVertexRandom();
        this.setState({
            nodes: this.graph.nodes
        });
    };

    render() {
        return (
            <div>
                <Nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                    <NavItem>
                        <NavLink className="navbar-brand" href="#">Graph room</NavLink>
                    </NavItem>

                    <Navbar className="px-3">
                        <NavItem className="text-nowrap">
                            <NavLink className="nav-link" disabled href="#">Leave room</NavLink>
                        </NavItem>
                    </Navbar>
                </Nav>
                <Container fluid>
                    <Row>
                        <Col md="3" className="sidebar d-none d-md-block bg-light">
                            <div className="sidebar-sticky">
                                <Chat username={this.props.username} />
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
        username: state.auth.username
    }
};

export default connect(mapStateToProps, null) (Room);