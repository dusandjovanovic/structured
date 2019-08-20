import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const boundaryErrorFallback = props => {
	const { classes } = props;

	return (
		<Grid container direction="column" spacing={4} className={classes.root}>
			<Grid item>
				<Typography variant="h3">:(</Typography>
			</Grid>
			<Grid item>
				<Typography variant="h5" gutterBottom>
					We are sorry but something went wrong
				</Typography>
				<Typography variant="subtitle1" color="textSecondary">
					Please refresh the app and let us know if this keeps
					happening
				</Typography>
			</Grid>
			<Grid item>
				<Typography variant="subtitle2" color="error">
					{props.code.toString()}
				</Typography>
			</Grid>
		</Grid>
	);
};

boundaryErrorFallback.propTypes = {
	classes: PropTypes.object.isRequired,
	code: PropTypes.object.isRequired
};

export default React.memo(withStyles(styles)(boundaryErrorFallback));
