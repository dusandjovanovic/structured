import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const RoomNew = props => (
	<Grid
		container
		spacing={2}
		direction="column"
		className={props.classes.root}
	>
		<Grid item xs={12}>
			<Grow in timeout={1000}>
				<Typography variant="h4" color="primary" gutterBottom>
					Hi {props.username}
				</Typography>
			</Grow>
			<Grow in timeout={1500}>
				<Typography variant="h5" color="primary">
					Join existing rooms or create a new one
				</Typography>
			</Grow>
		</Grid>
		<Grid item xs={12}>
			<Grow in timeout={1500}>
				<Typography variant="button" color="secondary">
					By creating a new room you are a room Master, others who
					join are spectators and can see everything you do.
				</Typography>
			</Grow>
		</Grid>
		<Grid item xs={12}>
			<Grow in timeout={1500}>
				<Button
					color="primary"
					size="large"
					variant="contained"
					onClick={props.handleNewRoomOpen}
				>
					Create new room
				</Button>
			</Grow>
		</Grid>
	</Grid>
);

RoomNew.propTypes = {
	classes: PropTypes.object.isRequired,
	handleNewRoomOpen: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired
};

export default withStyles(styles)(React.memo(RoomNew));
