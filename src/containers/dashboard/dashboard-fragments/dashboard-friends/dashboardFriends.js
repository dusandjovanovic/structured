import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "../../../../components/interface/card/card";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PeopleIcon from "@material-ui/icons/People";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

class DashboardFriends extends React.PureComponent {
	state = {
		name: ""
	};

	handleChange = name => event => {
		this.setState({ [name]: event.target.value });
	};

	render() {
		const { classes } = this.props;

		return (
			<Grid container className={classes.root}>
				<Grid
					container
					justify="flex-start"
					alignItems="center"
					className={classes.container}
					spacing={2}
				>
					<Grid item>
						<TextField
							id="name"
							label="Name"
							variant="outlined"
							className={classes.textField}
							value={this.state.name}
							onChange={this.handleChange("name")}
						/>
					</Grid>
					<Grid item>
						<Button
							variant="text"
							color="secondary"
							onClick={() =>
								this.props.friendAdd(this.state.name)
							}
						>
							Send a friend request
						</Button>
					</Grid>
				</Grid>
				<Grid
					container
					justify="center"
					spacing={2}
					className={classes.container}
				>
					<Grid item xs={12} md={6}>
						<Card title="Your friends">
							<List aria-label="list-friends">
								{this.props.friends.map(element => (
									<ListItem button key={element}>
										<ListItemAvatar>
											<Avatar>
												<PeopleIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={element}
											secondary="Friends since a long time ago"
										/>
									</ListItem>
								))}
							</List>
						</Card>
					</Grid>
					<Grid item xs={12} md={6}>
						<Card title="Pending friend requests">
							<List aria-label="list-requests">
								{this.props.requests.map(element => (
									<ListItem
										button
										key={element}
										onClick={() =>
											this.props.friendConfirm(
												element["_id"]
											)
										}
									>
										<ListItemAvatar>
											<Avatar>
												<PersonAddIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={element.sender}
											secondary={element.time}
										/>
										<CheckCircleIcon color="secondary" />
									</ListItem>
								))}
							</List>
						</Card>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

DashboardFriends.propTypes = {
	classes: PropTypes.object.isRequired,
	friends: PropTypes.arrayOf(PropTypes.string).isRequired,
	requests: PropTypes.arrayOf(PropTypes.object).isRequired,
	friendAdd: PropTypes.func.isRequired,
	friendConfirm: PropTypes.func.isRequired
};

export default withStyles(styles)(DashboardFriends);
