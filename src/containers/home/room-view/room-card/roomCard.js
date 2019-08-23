import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import FaceIcon from "@material-ui/icons/Face";
import ChevronRightIcon from "@material-ui/icons/ArrowForwardIos";
import RoomBackground from "../../../../assets/images/room-background.jpg";
import RoomBackgroundAlt from "../../../../assets/images/room-background-alt.jpg";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const roomCard = props => {
	const { classes } = props;

	const prettyDescription = type => {
		switch (type) {
			case "practice":
				return "This is a practice room where you get to know graphs and algorithms along with chatting.";
			case "compete":
				return "This is a compete room where you get to check how much you know about graph traversals.";
			default:
				return "This is learn room wjere you can learn about graphs alone.";
		}
	};

	const prettyDateFormat = time => {
		return new Date(time).toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric"
		});
	};

	const imageByType = type => {
		return type === "practice" ? RoomBackground : RoomBackgroundAlt;
	};

	return (
		<Card className={classes.card}>
			<CardMedia
				className={classes.media}
				image={imageByType(props.type)}
			/>
			<CardContent className={classes.content}>
				<Typography variant="h5" color="primary">
					{props.name}
				</Typography>
				<Typography
					variant="caption"
					color="textSecondary"
					className={classes.borderlineText}
				>
					{prettyDateFormat(props.time)}
				</Typography>
				<Typography variant="subtitle2" color="textSecondary">
					{prettyDescription(props.type)}
				</Typography>
				<Divider variant="middle" light className={classes.divider} />
				<div className={classes.chipWrapper}>
					{props.users.map(user => (
						<Chip
							color="primary"
							key={user}
							label={user}
							className={classes.chip}
							avatar={
								<Avatar>
									<FaceIcon />
								</Avatar>
							}
						/>
					))}
				</div>
			</CardContent>
			<CardActions
				className={classes.actions}
				onClick={() =>
					props.enterRoom(props.name, props.maxUsers, props.type)
				}
			>
				<Button
					variant="text"
					color="secondary"
					className={classes.actionsText}
				>
					Join this room{" "}
					<ChevronRightIcon
						fontSize="small"
						className={classes.icon}
					/>
				</Button>
			</CardActions>
			{props.currentUsers === props.maxUsers ? (
				<div className={classes.occupied}>
					<Typography
						variant="h5"
						color="textSecondary"
						className={classes.occupiedTitle}
					>
						Room is full
					</Typography>
					<Typography variant="h4" color="textSecondary">
						{props.currentUsers}
					</Typography>
					<Typography variant="h5" color="textSecondary">
						{props.maxUsers}
					</Typography>
				</div>
			) : null}
		</Card>
	);
};

roomCard.propTypes = {
	classes: PropTypes.object.isRequired,
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
	users: PropTypes.array.isRequired,
	currentUsers: PropTypes.number.isRequired,
	maxUsers: PropTypes.number.isRequired,
	enterRoom: PropTypes.func.isRequired
};

export default withStyles(styles)(React.memo(roomCard));
