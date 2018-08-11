import React, {Component} from 'react';
import { Redirect, withRouter } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import Graph from './graph/graph';
import Chat from './chat/chat';
import Navbar from './navbar/navbar';
import Overlay from '../../components/user-interface/spinner-overlay/spinnerOverlay';

import withMaster from "../../components-higher/with-master/withMaster";
import withRedux from '../../components-higher/with-redux/withRedux';
import withGraph from "../../components-higher/with-graph/withGraph";
import withIO from "../../components-higher/with-io/withIO";

import './room.css';

class Room extends Component {
    graphWidth = 700;
    graphHeight = 600;

    state = {
        redirect: false
    };

    componentDidMount() {
        window.addEventListener("beforeunload", this.leaveRoom);
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
            console.log('websocket::node ', received.node);
            this.props.addNodeValue(received.node);
        });
    };

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.leaveRoom);
    };

    render() {
        let waiting = null;
        if (this.props.waiting)
            waiting = <Overlay />;
        else if (this.state.redirect && !this.props.error)
            waiting = <Redirect to="/"/>;

        return (
                <div className="room">
                    {waiting}
                    <Navbar deleteRoom={() => this.deleteRoom()} leaveRoom={() => this.leaveRoom()} room={this.props.room}/>
                    <Container fluid>
                        <Row>
                            <Col md="3" className="sidebar d-none d-md-block bg-light">
                                <div className="sidebar-sticky">
                                    <Chat room={this.props.room.name} username={this.props.username} io={this.props.io} />
                                </div>
                            </Col>
                            <Col md="9" className="ml-sm-auto pt-3 px-4">
                                { this.props.children }
                                <Graph visualization={this.props.visualization}
                                       width={this.graphWidth}
                                       height={this.graphHeight}
                                       managed={this.props.graphManaged}
                                       managedAddEdge={this.props.graphManagedAddEdge}
                                       managedRemoveNode={this.props.graphManagedRemoveNode}
                                       managedRemoveEdge={this.props.graphManagedRemoveEdge}
                                       removeEdge={(source, target) => this.props.removeEdge(source, target)}
                                       addEdge={(source, target) => this.props.addEdge(source, target)}
                                       removeNode={(node) => this.props.removeNode(node)}
                                />
                            </Col>
                        </Row>
                    </Container>
                </div>
        );
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
        return "unloading";
    };
}

export default withRouter((withRedux (withIO (withGraph (withMaster (Room))))));