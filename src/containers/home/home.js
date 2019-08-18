import React from "react";
import Grid from "@material-ui/core/Grid";
import RoomNew from "./room-new/roomNew";
import RoomNewModal from "./room-new-modal/roomNewModal";
import RoomView from "./room-view/roomView";
import PropTypes from "prop-types";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";
import withErrorHandler from "../../hoc/with-error-handler/withErrorHandler";

class Home extends React.Component {
	state = {
		redirect: false,
		newRoom: false,
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
		this.props.roomJoinExisting(name);
		this.setState({
			redirect: true
		});
	};

	createAndEnterRoom = (name, maxUsers, roomType) => {
		this.props.roomCreateNew(name, maxUsers, roomType);
		this.setState({
			redirect: true
		});
	};

	handleNewRoomOpen = () => {
		this.setState({
			newRoom: true
		});
	};

	handleNewRoomClose = () => {
		if (!this.state.error.hasError) {
			this.setState({
				newRoom: false
			});
		}
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
			<Grid container className={classes.root}>
				{redirection}
				<RoomNewModal
					open={this.state.newRoom}
					handleModalClose={this.handleNewRoomClose}
					createAndEnterRoom={this.createAndEnterRoom}
				/>
				<Grid container justify="center" alignItems="center">
					<Grid item md={8} xs={10}>
						<RoomNew 
                            username={this.props.username}
                            handleNewRoomOpen={this.handleNewRoomOpen} 
                        />
					</Grid>
					<Grid item md={8} xs={10}>
						<hr />
					</Grid>
					<Grid item xs={10}>
						<RoomView
							enterRoom={name => this.enterRoom(name)}
							rooms={this.props.rooms}
							waiting={this.props.waiting}
						/>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

const mapStateToProps = state => {
	return {
        username: state.auth.username,
		room: state.room.room,
		rooms: state.room.rooms,
		data: state.room.data,
		waiting: state.room.waiting || state.user.waiting,
		error: state.room.error || state.user.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		roomGetAll: mode => dispatch(actions.roomGetAll(mode)),
		roomJoinExisting: name => dispatch(actions.roomJoinExisting(name)),
		roomCreateNew: (name, maxUsers, roomType) =>
			dispatch(actions.roomCreateNew(name, maxUsers, roomType))
	};
};

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
	room: PropTypes.object.isRequired,
	rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
	data: PropTypes.object.isRequired,
	waiting: PropTypes.bool.isRequired,
	error: PropTypes.string,
	roomGetAll: PropTypes.func.isRequired,
	roomJoinExisting: PropTypes.func.isRequired,
	roomCreateNew: PropTypes.func.isRequired
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(withErrorHandler(Home)));
