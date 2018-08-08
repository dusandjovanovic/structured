import React from 'react';
import { Container, Row } from 'reactstrap';
import {Redirect, withRouter} from "react-router-dom";
import RoomNew from './room-new/roomNew';
import RoomView from './room-view/roomView';
import { connect } from 'react-redux';
import * as actions from "../../redux/actions";
import Overlay from "../../components/user-interface/spinner-overlay/spinnerOverlay";

class Home extends React.Component {
    state = {
        redirect: false
    };

    componentDidMount() {
        this.props.roomGetAll("all");
    }

    enterRoom = (name) => {
        this.props.roomJoinExisting(name, this.props.username);
        this.setState({
            redirect: true
        });
    };

    createAndEnterRoom = (name, maxUsers) => {
        this.props.roomCreateNew(name, maxUsers, this.props.username);
        this.setState({
            redirect: true
        });
    };

    render() {
        let waiting = null;
        if (this.props.waiting && this.props.rooms.length === 0)
            waiting = <Overlay />;
        else if (this.state.redirect && !this.props.error)
            waiting = <Redirect to="/room" />;

        return (
            <div className="bg-light p-4">
                {waiting}
                <Container>
                    <Row>
                        <RoomNew createAndEnterRoom={(name, maxUsers) => this.createAndEnterRoom(name, maxUsers)}/>
                    </Row>
                    <hr />
                    {this.props.rooms
                        ? <RoomView enterRoom={(name) => this.enterRoom(name)}
                                    rooms={this.props.rooms}
                                    waiting={this.props.waiting}
                                    stick={this.props.waiting && this.props.rooms.length > 0}
                          />
                        : null
                    }
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
        waiting: state.room.waiting,
        error: state.room.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        roomGetAll: (mode) => dispatch(actions.roomGetAll(mode)),
        roomJoinExisting : (name, username) => dispatch(actions.roomJoinExisting(name, username)),
        roomCreateNew: (name, maxUsers, username) => dispatch(actions.roomCreateNew(name, maxUsers, username))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Home));