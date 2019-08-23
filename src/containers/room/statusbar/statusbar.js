import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

const statusbar = props => {
	const { classes } = props;
	return (
		<footer className={classes.root}>
			<Typography
				variant="caption"
				className={classNames(
					classes.element,
					classes.bordered,
					classes.elementHighlighted
				)}
			>
				{props.master
					? "You are a room master"
					: "Room master is " + props.createdBy}
			</Typography>
			<Typography
				variant="caption"
				className={classNames(classes.element, classes.elementLight)}
			>
				Everyone in the room:
			</Typography>
			{props.users.map(user => (
				<Typography
					variant="caption"
					className={classNames(
						classes.element,
						classes.elementLight
					)}
					key={user}
				>
					{user}
				</Typography>
			))}
			{props.graphManaged ? (
				<div className={classes.managed}>
					<Typography
						variant="caption"
						className={classNames(
							classes.element,
							classes.elementHighlighted,
							classes.elementManaged
						)}
					>
						{props.graphOperation.toLowerCase()}
					</Typography>
				</div>
			) : null}
		</footer>
	);
};

statusbar.propTypes = {
	classes: PropTypes.object.isRequired,
	master: PropTypes.bool.isRequired,
	graphOperation: PropTypes.string,
	graphManaged: PropTypes.bool.isRequired,
	users: PropTypes.arrayOf(PropTypes.string).isRequired,
	createdBy: PropTypes.string.isRequired
};

export default withStyles(styles)(React.memo(statusbar));
