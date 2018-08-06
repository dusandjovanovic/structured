import React, { Component } from 'react';
import { Card, ButtonDropdown, DropdownMenu, ButtonGroup, CardHeader, CardText, CardBody, CardSubtitle, Button, DropdownItem, DropdownToggle} from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Modal from '../../../components/user-interface/modal/modal';
import * as actions from "../../../redux/actions";
import connect from "react-redux/es/connect/connect";

class newRoom extends Component {
    roomName = '';
    roomUsers = 1;

    state = {
        dropdownOpen: false,
        newAvailable: false,
        roomType: 'practise'
    };

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    };

    newRoomHandler = (event) => {
        event.preventDefault();
        this.props.onRoomCreateNew(this.roomName.value, this.roomUsers.value, this.props.username);
    };

    practiseHandler = () => {
        this.setState({
            roomType: 'practise',
            newAvailable: true
        });
    };

    competeHandler = () => {
        this.setState({
            roomType: 'compete',
            newAvailable: true
        });
    };

    learnHandler = () => {
        this.setState({
            roomType: 'learn',
            newAvailable: true
        });
    };

    render() {
        return (
            <Card className="m-auto">
                <CardHeader>
                    <h5>Create your own room</h5>
                </CardHeader>
                <CardBody>
                    <CardSubtitle>A new room your friends could join.. Everyone can see your <mark>actions and
                        messages</mark>.</CardSubtitle>
                </CardBody>
                <CardBody>
                    <CardText>By creating a new room you are a room Master, others who join are spectators and can see
                        everything you do.</CardText>
                    <ButtonGroup>
                        <Button onClick={this.practiseHandler}>Practise</Button>
                        <Button onClick={this.competeHandler}>Compete</Button>
                        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                More
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.learnHandler}>Learn</DropdownItem>
                                <DropdownItem>Binary trees?</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                        <Modal title="Create a new room"
                               buttonCondition={this.state.newAvailable}
                               buttonLabel="New!">
                            <Form onSubmit={this.newRoomHandler}>
                                <FormGroup>
                                    <Label for="room">Room name:</Label>
                                    <Input type="input" innerRef={(node) => this.roomName = node} name="roomIdentifier" id="room" placeholder="room identifier"/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleSelect">Number of users:</Label>
                                    <Input type="select" name="select" id="exampleSelect" innerRef={(node) => this.roomUsers = node}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </FormGroup>
                                <Button className="btn btn-danger btn-large" type="submit">Create</Button>
                            </Form>
                        </Modal>
                    </ButtonGroup>

                </CardBody>
            </Card>
        );
    };
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        room: state.room.room,
        rooms: state.room.rooms,
        error: state.room.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRoomCreateNew: (name, maxUsers, username) => dispatch(actions.roomCreateNew(name, maxUsers, username))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (newRoom);