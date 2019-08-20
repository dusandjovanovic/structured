import React from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const dashboardView = props => {
	const { classes } = props;

	return (
		<Grid container className={classes.root}>
			{props.children}
		</Grid>
	);
};

dashboardView.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired
};

export default withStyles(styles)(React.memo(dashboardView));
