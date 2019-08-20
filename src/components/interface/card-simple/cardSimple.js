import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import PropTypes from "prop-types";

import Timeline from "@material-ui/icons/Timeline";
import People from "@material-ui/icons/People";
import HowToReg from "@material-ui/icons/HowToReg";
import Style from "@material-ui/icons/Style";
import Timelapse from "@material-ui/icons/Timelapse";
import CalendarToday from "@material-ui/icons/CalendarToday";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const cardSimple = props => {
	const { classes } = props;
	let icon;
	switch (props.type) {
		case "people": {
			icon = <People color="primary" fontSize="large" />;
			break;
		}
		case "sessions": {
			icon = <HowToReg color="primary" fontSize="large" />;
			break;
		}
		case "videos": {
			icon = <Style color="primary" fontSize="large" />;
			break;
		}
		case "calendar": {
			icon = <CalendarToday color="primary" fontSize="large" />;
			break;
		}
		case "timelapse": {
			icon = <Timelapse color="primary" fontSize="large" />;
			break;
		}
		default: {
			icon = <Timeline color="primary" fontSize="large" />;
			break;
		}
	}
	return (
		<Card className={classes.card}>
			<CardContent className={classes.content}>
				<Grid container direction="row" justify="center" spacing={2}>
					<Grid item xs={3}>
						<div className={classes.icon}>{icon}</div>
					</Grid>
					<Grid item xs={9}>
						<Typography
							variant="h6"
							color="primary"
							className={classes.title}
							gutterBottom
						>
							{props.title}
						</Typography>
						<Typography variant="h5" className={classes.subtitle}>
							{props.content}
						</Typography>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions className={classes.actions}>
				<Typography variant="body2" className={classes.details}>
					{props.details}
				</Typography>
			</CardActions>
		</Card>
	);
};

cardSimple.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		.isRequired,
	details: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
};

export default withStyles(styles)(React.memo(cardSimple));
