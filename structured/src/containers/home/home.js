import React from "react";
import { Container, Row } from "reactstrap";
import { Redirect, withRouter } from "react-router-dom";
import RoomNew from "./room-new/roomNew";
import RoomView from "./room-view/roomView";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";
import withErrorHandler from "../../hoc/with-error-handler/withErrorHandler";

class Home extends React.Component {
    state = {
        redirect: false,
        error: {
            hasError: false,
            name: null,
            description: null
        }
    };
    interval;

    componentDidMount() {
        this.props.roomGetAll("all");
        this.interval = setInterval(() => this.props.roomGetAll("all"), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    enterRoom = name => {
        this.props.roomJoinExisting(name, this.props.username);
        this.setState({
            redirect: true
        });
    };

    createAndEnterRoom = (name, maxUsers, roomType) => {
        this.props.roomCreateNew(name, maxUsers, roomType, this.props.username);
        this.setState({
            redirect: true
        });
    };

    render() {
        const { classes } = this.props;

        let redirection = null;

        if (
            this.state.redirect &&
            !this.props.waiting &&
            !this.props.error &&
            this.props.data._id
        ) {
            if (this.props.data.roomType === "practice")
                redirection = <Redirect to="/room" />;
            else if (this.props.data.roomType === "compete")
                redirection = <Redirect to="/compete" />;
            else if (this.props.data.roomType === "learn")
                redirection = <Redirect to="/learn" />;
        }

        return (
            <div className={classes.root}>
                {redirection}
                <Container>
                    <Row>
                        <RoomNew
                            createAndEnterRoom={(name, maxUsers, roomType) =>
                                this.createAndEnterRoom(
                                    name,
                                    maxUsers,
                                    roomType
                                )
                            }
                        />
                    </Row>
                    <hr className="mt-5" />
                    {this.props.rooms ? (
                        <RoomView
                            enterRoom={name => this.enterRoom(name)}
                            rooms={this.props.rooms}
                            waiting={this.props.waiting}
                            stick={
                                this.props.waiting &&
                                this.props.rooms.length > 0
                            }
                        />
                    ) : null}
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
        data: state.room.data,
        waiting: state.room.waiting,
        error: state.room.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        roomGetAll: mode => dispatch(actions.roomGetAll(mode)),
        roomJoinExisting: (name, username) =>
            dispatch(actions.roomJoinExisting(name, username)),
        roomCreateNew: (name, maxUsers, roomType, username) =>
            dispatch(actions.roomCreateNew(name, maxUsers, roomType, username))
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(withStyles(styles)(withErrorHandler(Home)))
);
