import React from "react";
import Grid from "@material-ui/core/Grid";
import RoomCard from "./room-card/roomCard";
import SomethingWentWrong from "../../../components/interface/something-went-wrong/somethingWentWrong";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const roomView = props => {
	const { classes } = props;

	return (
		<Grid container justify="center" className={classes.root} spacing={2}>
			{props.rooms.length > 0 ? (
				props.rooms.map(room => {
					return (
						<Grid item key={room["_id"]} lg={3} md={4} xs={12}>
							<RoomCard
								type={room.roomType}
								name={room.name}
								time={room.time}
								users={room.users}
								currentUsers={room.currentUsers}
								maxUsers={room.maxUsers}
								enterRoom={props.enterRoom}
							/>
						</Grid>
					);
				})
			) : (
				<SomethingWentWrong text="Such empty, your friends didn't create any rooms" />
			)}
		</Grid>
	);
};

roomView.propTypes = {
	classes: PropTypes.object.isRequired,
	rooms: PropTypes.arrayOf(PropTypes.object),
	enterRoom: PropTypes.func.isRequired
};

export default withStyles(styles)(React.memo(roomView));
