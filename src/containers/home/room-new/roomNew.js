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
				<Grid item xs={12}>
					<Typography variant="h6" color="primary">
						Join existing rooms or create a new one..
					</Typography>
					<Typography
						variant="h6"
						color="secondary"
						className={props.classes.normalizedText}
					>
						By creating a new room you are a room Master, others who
						join are spectators and can see everything you do
					</Typography>
				</Grid>
			</Grow>
		</Grid>
		<Grid item xs={12}>
			<Grow in timeout={1500}>
				<Button
					color="secondary"
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
