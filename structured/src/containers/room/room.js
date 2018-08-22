import React, {Component} from 'react';
import { Redirect, withRouter } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import Graph from './graph/graph';
import Chat from './chat/chat';
import Navbar from './navbar/navbar';
import Statusbar from './statusbar/statusbar';
import Overlay from '../../components/user-interface/spinner-overlay/spinnerOverlay';
import AlgorithmCore from './algorithm/core/algorithm';

import withAlgorithm from "../../hoc/with-algorithm/withAlgorithm";
import withPlayground from "../../hoc/with-playground/withPlayground";
import withRedux from '../../hoc/with-redux/withRedux';
import withGraph from "../../hoc/with-graph/withGraph";
import withIO from "../../hoc/with-io/withIO";
import withCompete from "../../hoc/with-compete/withCompete";
import withLearn from "../../hoc/with-learn/withLearn";

import './room.css';

class Room extends Component {
    state = {
        redirect: false,
        roomName: null
    };

    componentDidMount() {
        window.addEventListener("beforeunload", this.leaveRoom);
        this.setState({roomName: this.props.room.name});

        if (!this.props.learn)
        this.props.socket.on(this.props.room.name + ' delete room', received => {
            this.props.roomLeaveExisting(this.props.room.name, this.props.username, true);
            this.props.notificationSystem("The room has been deleted.", "error", 5, null, null);
            this.setState({
                redirect: true
            });
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
                            {this.props.competitive || this.props.learn
                                ? null
                                : <Col md="3" className="sidebar d-none d-md-block bg-light">
                                    <div className="sidebar-sticky">
                                        <Chat room={this.props.room.name} username={this.props.username} io={this.props.io} />
                                    </div>
                                  </Col>
                            }
                            <Col md={this.props.competitive || this.props.learn ? "12" : "9"} className="ml-sm-auto pt-3 px-4">
                                {
                                    this.props.children
                                }
                                <Graph visualization={this.props.visualization}
                                       graphManaged={this.props.graphManaged}
                                       graphAnimated={this.props.graphAnimated}
                                       graphAnimatedEnded={this.props.graphAnimatedEnded}

                                       nodeSelected={this.props.nodeSelected}
                                       nodeFocused={this.props.nodeFocused}
                                       nodeCurrent={this.props.nodeCurrent}
                                       nodesHighlighted={this.props.nodesHighlighted}
                                       nodesAdjacent={this.props.nodesAdjacent}
                                       nodeRoot={this.props.nodeRoot}

                                       handlerNodeSelected={this.props.handlerNodeSelected}
                                       handlerNodeFocused={this.props.handlerNodeFocused}
                                       handlerNodeLostFocus={this.props.handlerNodeLostFocus}
                                       handlerViewport={this.props.handlerViewport}

                                       managedAddEdge={this.props.graphManagedAddEdge}
                                       managedRemoveNode={this.props.graphManagedRemoveNode}
                                       managedRemoveEdge={this.props.graphManagedRemoveEdge}

                                       removeEdge={(source, target) => this.props.removeEdge(source, target)}
                                       addEdge={(source, target) => this.props.addEdge(source, target)}
                                       removeNode={(node) => this.props.removeNode(node)}
                                       width={800} height={600}
                                />
                            </Col>
                            <footer className="footer">
                                <Container fluid>
                                    <Statusbar users={this.props.data.users}
                                               master={this.props.room.master}
                                               graphManaged={this.props.graphManaged}
                                               graphOperation={this.props.graphOperation}
                                               createdBy={this.props.data.createdBy} />
                                </Container>
                            </footer>
                        </Row>
                        {this.props.algorithm
                            ? <AlgorithmCore />
                            : null
                        }
                    </Container>
                </div>
        );
    };

    deleteRoom = () => {
        this.props.roomDeleteExisting(this.props.data._id)
            .then(response => {
                if (!this.props.learn)
                    this.props.deleteRoomIO(this.state.roomName);

                this.setState({
                    redirect: true
                });
            });
    };

    leaveRoom = () => {
        this.props.roomLeaveExisting(this.props.room.name, this.props.username, false)
            .then(response => {
                if (!this.props.learn)
                    if (response.newMaster)
                        this.props.masterChangedIO(this.state.roomName, response.newMaster);
                    else
                        this.props.joinLeaveRoomIO(this.state.roomName, response.msg);

                this.setState({
                    redirect: true
                });
            });

        return "unloading";
    };
}

export const RoomPlayground = withRouter((withRedux (withIO (withGraph (withAlgorithm (withPlayground (Room)))))));
export const RoomCompete = withRouter((withRedux (withIO (withGraph (withCompete (Room))))));
export const RoomLearn = withRouter((withRedux (withGraph (withLearn (Room)))));