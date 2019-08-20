import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const card = props => {
	const { classes } = props;

	return (
		<Paper className={classes.container}>
			<Typography variant="h6" className={classes.title}>
				{props.title}
			</Typography>
			<div className={classes.children}>{props.children}</div>
		</Paper>
	);
};

card.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired
};

export default withStyles(styles)(React.memo(card));
