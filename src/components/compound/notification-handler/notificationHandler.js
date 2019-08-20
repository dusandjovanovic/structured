import React from "react";
import Notification from "./notification/notification";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

import { internalNotificationsRemove } from "../../../store/actions/index";
import { connect } from "react-redux";

class NotificationHandler extends React.Component {
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				{this.props.notifications.map(element => (
					<Notification
						id={element.id}
						key={element.id}
						message={element.message}
						variant={element.variant}
						onClose={this.props.internalNotificationsRemove}
					/>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		notifications: state.internal.notifications
	};
};

const mapDispatchToProps = dispatch => {
	return {
		internalNotificationsRemove: id =>
			dispatch(internalNotificationsRemove(id))
	};
};

NotificationHandler.propTypes = {
	classes: PropTypes.object.isRequired,
	notifications: PropTypes.arrayOf(PropTypes.object),
	internalNotificationsAdd: PropTypes.func,
	internalNotificationsRemove: PropTypes.func
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(NotificationHandler));
