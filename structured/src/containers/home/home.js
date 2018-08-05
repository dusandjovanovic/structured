import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardHeader, CardText, CardBody, CardLink, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from "../../redux/actions";
import classes from './home.css';

class Home extends React.Component {
    componentDidMount() {
        this.props.onRoomGetAll("all");
    }

    render() {
        return (
            <div className="bg-secondary">
                <Container className="container-fluid">
                    <Row>
                        {this.props.rooms.map(room => {
                                return (
                                    <Card body outline color="secondary" className="shadow text-center m-2 text-white bg-dark mb-3" key={room._id}>
                                        <CardHeader>{room.name}</CardHeader>
                                        <CardBody>
                                            <CardText>Currently {room.currentUsers} users in the room, out of {room.maxUsers}.</CardText>
                                            <Button>Join room</Button>
                                        </CardBody>
                                        <CardText>
                                            <small className="text-muted">Last updated 3 mins ago</small>
                                        </CardText>
                                    </Card>
                                );
                            })
                        }
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        room: state.room.room,
        rooms: state.room.rooms,
        error: state.room.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRoomGetAll: (mode) => dispatch(actions.roomGetAll(mode)),
        onRoomCreateNew: (name, maxUsers) => dispatch(actions.roomCreateNew(name, maxUsers))
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (Home);