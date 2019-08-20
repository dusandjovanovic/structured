import React from "react";
import AppBar from "@material-ui/core/AppBar";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const toolbar = props => {
	const { classes } = props;

	return (
		<AppBar position="fixed" className={classes.appBar}>
			{props.children}
		</AppBar>
	);
};

toolbar.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired
};

export default withStyles(styles)(toolbar);
