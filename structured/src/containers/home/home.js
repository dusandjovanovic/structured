import React from 'react';
import { Container, Row } from 'reactstrap';
import {withRouter} from "react-router-dom";
import SomethingWentWrong from '../../components/user-interface/something-went-wrong/somethingWentWrong';
import { Card, CardHeader, CardText, CardBody, CardTitle, Button} from 'reactstrap';
import NewRoom from './new-room/newRoom';
import { connect } from 'react-redux';
import * as actions from "../../redux/actions";

class Home extends React.Component {
    componentDidMount() {
        this.props.roomGetAll("all");
    }

    enterRoom = (name) => {
        this.props.roomJoinExisting(name, this.props.username);
        this.props.history.push("/room");
    };

    createAndEnterRoom = (name, maxUsers, username) => {
        this.props.onRoomCreateNew(name, maxUsers, this.props.username);
        this.props.history.push("/room");
    };

    render() {
        return (
            <div className="bg-light p-4">
                <Container className="container-fluid">
                    {this.props.rooms !== null && this.props.rooms.length > 0
                        ?   <div>
                                <Row>
                                    <h2 className="text-center p-1">Some rooms you could join:</h2>
                                </Row>
                                <Row> {this.props.rooms.map(room => {
                                    return (
                                        <Card outline color="secondary" className="shadow text-center m-2 text-white bg-dark mb-3" key={room._id}>
                                            <CardHeader>
                                                <CardTitle className="mb-0">{room.name}</CardTitle>
                                                {(room.currentUsers === room.maxUsers)
                                                    ? <small className="text-danger">unavailable</small>
                                                    : <small className="text-success">available</small>}
                                            </CardHeader>
                                            <CardBody className="m-3">
                                                <CardText>Currently {room.currentUsers} users in the room, out of {room.maxUsers}.</CardText>
                                                <Button onClick={() => this.enterRoom(room.name)}>Join room</Button>
                                            </CardBody>
                                            <CardText>
                                                <small className="text-muted">last updated sometime ago</small>
                                            </CardText>
                                        </Card>
                                    );
                                    })
                                }
                                </Row>
                            </div>
                        : <SomethingWentWrong text="Such empty, your friends didn't create any rooms." alternative="...or something went wrong :("/>}
                    <hr />
                    <Row>
                        <NewRoom createAndEnterRoom={(name, maxUsers) => this.createAndEnterRoom(name, maxUsers)}/>
                    </Row>
                </Container>
            </div>
        );
    }
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
        roomGetAll: (mode) => dispatch(actions.roomGetAll(mode)),
        roomJoinExisting : (name, username) => dispatch(actions.roomJoinExisting(name, username)),
        onRoomCreateNew: (name, maxUsers, username) => dispatch(actions.roomCreateNew(name, maxUsers, username))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Home));