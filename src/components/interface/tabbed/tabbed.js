import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const tabbed = props => {
	const { classes } = props;

	return (
		<AppBar position="static" className={classes.appBar}>
			<Tabs
				value={props.value}
				onChange={(event, value) => props.handleSelectionChange(value)}
				classes={{
					indicator: classes.tabsIndicator,
					flexContainer: classes.container
				}}
			>
				{props.labels.map(label => (
					<Tab
						key={label}
						label={label}
						classes={{
							root: classes.tabRoot,
							selected: classes.tabSelected
						}}
					/>
				))}
			</Tabs>
		</AppBar>
	);
};

tabbed.propTypes = {
	classes: PropTypes.object.isRequired,
	labels: PropTypes.arrayOf(PropTypes.string).isRequired,
	value: PropTypes.number.isRequired,
	handleSelectionChange: PropTypes.func.isRequired
};

export default withStyles(styles)(React.memo(tabbed));
