import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import image from "../../../assets/images/something-went-wrong.png";
import PropTypes from "prop-types";

const somethingWentWrong = props => {
	return (
		<Grid container justify="center">
			<Grid container justify="center">
				<Typography variant="h5">{props.text}</Typography>
			</Grid>
			<Grid item xs={6} md={3}>
				<img src={image} width="100%" alt="such-empty-im" />
			</Grid>
		</Grid>
	);
};

somethingWentWrong.propTypes = {
	text: PropTypes.string.isRequired
};

export default React.memo(somethingWentWrong);
