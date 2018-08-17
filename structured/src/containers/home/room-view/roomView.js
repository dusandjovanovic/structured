import React, {Component} from 'react';
import { Row, Card, CardHeader, CardText, CardBody, CardTitle, Button} from 'reactstrap';
import SomethingWentWrong from "../../../components/user-interface/something-went-wrong/somethingWentWrong";

class roomView extends Component {
    render() {
        let preview = null;
        if (!this.props.waiting || this.props.stick) {
            preview = (
                <Row>
                    {this.props.rooms.length > 0
                        ? this.props.rooms.map(room => {
                            return (
                                <Card color="secondary"
                                      className={"shadow text-center m-2 mb-3".concat(room.roomType === 'learn' ? " bg-light" : " text-white bg-dark")}
                                      key={room._id.concat(room.currentUsers)}>
                                    <CardHeader>
                                        <CardTitle className="mb-0">
                                            {room.name}
                                        </CardTitle>
                                        <span>
                                        {room.currentUsers === room.maxUsers
                                            ? <small className="text-danger">unavailable</small>
                                            : <small className="text-success">available</small>
                                        }
                                        <small className="text-info"> {room.roomType}</small>
                                        </span>
                                    </CardHeader>
                                    <CardBody className="m-2">
                                        <CardText>
                                            Currently {room.currentUsers} users in the room, out of {room.maxUsers}.
                                        </CardText>
                                        <Button disabled={room.currentUsers === room.maxUsers}
                                                onClick={() => this.props.enterRoom(room.name)}>
                                            Join room
                                        </Button>
                                    </CardBody>
                                    <CardText className="p-2">
                                        <small className="text-muted p">
                                            {room.time}
                                        </small>
                                    </CardText>
                                </Card>
                            );
                        })
                        : <SomethingWentWrong text="Such empty, your friends didn't create any rooms."
                                              alternative="...or something went wrong :("/>}
                </Row>
            );
        }

        return (preview);
    }
};

export default roomView;