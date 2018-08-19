import React, { Component } from 'react';
import Modal from "../../../components/user-interface/modal/modal";
import { FormGroup, Label, Input, Button, Form, Col, Row } from "reactstrap";

class dashboardCards extends Component {
    input = null;
    addFriendHandler = (event) => {
        event.preventDefault();
        this.props.friendAdd(this.props.username, this.input.value.trim());
    };

    render() {
        return (
            <Row>
                <Col xl="3" sm="6" className="mb-3">
                    <div className="shadow card text-white bg-primary o-hidden h-100">
                        <div className="card-body">
                            <div className="card-body-icon">
                                <i className="fas fa-user-friends"> </i>
                            </div>
                            <div className="mr-5">{this.props.numRequests} New friend requests</div>
                            <Modal title="Add a new friend" buttonCondition buttonLabel="Add a new friend" buttonClass="float-left btn btn-outline-light btn-sm m-1">
                                <Form onSubmit={this.addFriendHandler}>
                                    <FormGroup>
                                        <Label for="room">Enter your friends username:</Label>
                                        <Input type="input" innerRef={(node) => this.input = node} name="friendIdentifier" id="identifier" placeholder="username"/>
                                    </FormGroup>
                                    <Button className="btn btn-secondary m-auto btn-large" type="submit"><i className="fas fa-user-plus"></i> Send a request</Button>
                                </Form>
                            </Modal>
                        </div>
                        <div className="card-footer text-white clearfix small z-1">
                            <span className="float-left">Check the navbar</span>
                            <span className="float-right">
                        <i className="fas fa-angle-right"> </i>
                    </span>
                        </div>
                    </div>
                </Col>
                <Col xl="3" sm="6" className="mb-3">
                    <div className="shadow card text-white bg-info o-hidden h-100">
                        <div className="card-body">
                            <div className="card-body-icon">
                                <i className="fas fa-code"> </i>
                            </div>
                            <div className="mr-5">{this.props.numCompetes} Competes played today</div>
                            <small className="text-white small z-1"> all compete matches are evaluated</small>
                        </div>
                        <div className="card-footer text-white clearfix small z-1">
                            <span className="float-left">Look at statistics</span>
                            <span className="float-right">
                        <i className="fas fa-angle-right"> </i>
                    </span>
                        </div>
                    </div>
                </Col>
                <Col xl="3" sm="6" className="mb-3">
                    <div className="shadow card text-white bg-dark o-hidden h-100">
                        <div className="card-body">
                            <div className="card-body-icon">
                                <i className="far fa-chart-bar"> </i>
                            </div>
                            <div className="mr-5">Your history</div>
                            <small className="text-white small z-1"> your score history in detail</small>
                        </div>
                        <div className="card-footer text-white clearfix small z-1">
                            <span className="float-left">Look below</span>
                            <span className="float-right">
                        <i className="fas fa-angle-right"> </i>
                    </span>
                        </div>
                    </div>
                </Col>
                <Col xl="3" sm="6" className="mb-3">
                    <div className="shadow card text-white bg-secondary o-hidden h-100">
                        <div className="card-body">
                            <div className="card-body-icon">
                                <i className="fas fa-code-branch"> </i>
                            </div>
                            <div className="mr-5">Learn graphs</div>
                            <small className="text-white small z-1"> manage rooms in /home</small>
                        </div>
                        <div className="card-footer text-white clearfix small z-1">
                            <span className="float-left">Join or create a new room</span>
                            <span className="float-right">
                        <i className="fas fa-angle-right"> </i>
                    </span>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    };
}

export default dashboardCards;