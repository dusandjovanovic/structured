import React from "react";
import { ListItem, Button } from "@material-ui/core";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const headerLink = props => {
	const { classes } = props;
	let linkClasses = classes.navLink;
	if (props.active) linkClasses += ` ${classes.navLinkActive}`;

	return (
		<ListItem className={classes.listItem}>
			<Button
				onClick={event => props.action(event, props.value)}
				variant="text"
				className={linkClasses}
			>
				{props.icon ? <props.icon className={classes.icons} /> : null}
				{props.label}
			</Button>
		</ListItem>
	);
};

headerLink.propTypes = {
	classes: PropTypes.object.isRequired,
	action: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	active: PropTypes.bool,
	icon: PropTypes.object
};

export default withStyles(styles)(React.memo(headerLink));
