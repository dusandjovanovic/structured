import React, { Component } from 'react';
import { Card, ButtonDropdown, DropdownMenu, ButtonGroup, CardHeader, CardText, CardBody, CardSubtitle, Button, DropdownItem, DropdownToggle} from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Modal from '../../../components/user-interface/modal/modal';

class roomNew extends Component {
    roomName = '';
    roomUsers = {
        value: 1
    };

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
        this.props.createAndEnterRoom(this.roomName.value, this.roomUsers.value, this.state.roomType);
    };

    modeHandler = (mode) => {
        this.setState({
            roomType: mode,
            newAvailable: true
        });
    };

    render() {
        return (
            <Card className="shadow m-auto">
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
                        <Button onClick={() => this.modeHandler('practise')}>Practise</Button>
                        <Button onClick={() => this.modeHandler('compete')}>Compete</Button>
                        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                More
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => this.modeHandler("learn")}>Learn</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                        <Modal title="Create a new room" buttonCondition={this.state.newAvailable} buttonLabel="New!" buttonClass="btn-danger">
                            <Form onSubmit={this.newRoomHandler}>
                                <FormGroup>
                                    <Label for="room">Room name:</Label>
                                    <Input type="input" innerRef={(node) => this.roomName = node} name="roomIdentifier" id="room" placeholder="room identifier"/>
                                </FormGroup>
                                {this.state.roomType === 'learn'
                                    ? null
                                    : <FormGroup>
                                        <Label for="exampleSelect">Number of users:</Label>
                                        <Input type="select" name="select" id="exampleSelect" innerRef={(node) => this.roomUsers = node}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Input>
                                      </FormGroup>
                                }
                                <Button className="btn btn-danger m-auto btn-large" type="submit"><i className="fas fa-check"></i> Create</Button>
                            </Form>
                        </Modal>
                    </ButtonGroup>

                </CardBody>
            </Card>
        );
    };
}


export default roomNew;