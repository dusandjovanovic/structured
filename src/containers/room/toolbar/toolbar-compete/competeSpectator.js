import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Toolbar from "../../../../components/interface/toolbar/toolbar";
import PropTypes from "prop-types";

import Done from "@material-ui/icons/Done";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

import { COMPETE_BREADTH } from "../../../../utils/constants";

const compete = props => {
	const { classes } = props;

	return (
		<Toolbar>
			<Grid container>
				<Grid item xs={3}>
					<Typography
						variant="h6"
						color="textPrimary"
						className={classes.header}
					>
						{props.competeType === COMPETE_BREADTH
							? "Breadth-first search"
							: "Depth-first search"}
					</Typography>
				</Grid>
				<Grid item xs={9}>
					<Grid container justify="flex-end">
						<Button
							size="small"
							color="primary"
							disabled={!props.graphManaged}
							onClick={() => props.competeEnded()}
						>
							<Done fontSize="small" className={classes.icon} />{" "}
							Submit result
						</Button>
						<Button
							size="small"
							color="primary"
							onClick={() => props.leaveRoomIOInit()}
						>
							Leave room
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Toolbar>
	);
};

compete.propTypes = {
	classes: PropTypes.object.isRequired,
	graphManaged: PropTypes.bool.isRequired,
	competeEnded: PropTypes.func.isRequired,
	competeType: PropTypes.string.isRequired,
	leaveRoomIOInit: PropTypes.func.isRequired
};

export default withStyles(styles)(React.memo(compete));
