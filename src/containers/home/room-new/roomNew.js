import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
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
				<Box mb={2}>
					<Typography
						variant="h4"
						color="secondary"
						className={props.classes.lightenedText}
					>
						Hello {props.username},
					</Typography>
					<Typography
						variant="h5"
						className={props.classes.lightenedText}
					>
						Join existing rooms or create a new one.
					</Typography>
				</Box>
			</Grow>

			<Grid item xs={12}>
				<Grow in timeout={1250}>
					<Typography
						variant="h5"
						color="textSecondary"
						className={props.classes.lightenedText}
					>
						By creating a new room you become a master, others who
						join are spectators.
					</Typography>
				</Grow>
			</Grid>
		</Grid>
		<Grid item xs={12}>
			<Grow in timeout={1250}>
				<Button
					size="large"
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
