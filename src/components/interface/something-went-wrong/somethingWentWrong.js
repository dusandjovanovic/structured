import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import image from "../../../assets/images/something-went-wrong.png";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const somethingWentWrong = props => {
	const { classes } = props;

	return (
		<Grid container justify="center">
			<Grid container justify="center">
				<Typography variant="h5" className={classes.lightenedText}>
					{props.text}
				</Typography>
			</Grid>
			<Grid item xs={6} md={3}>
				<img src={image} width="100%" alt="such-empty-im" />
			</Grid>
		</Grid>
	);
};

somethingWentWrong.propTypes = {
	classes: PropTypes.object.isRequired,
	text: PropTypes.string.isRequired
};

export default React.memo(withStyles(styles)(somethingWentWrong));
