import React from "react";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Grow from "@material-ui/core/Grow";
import IconButton from "@material-ui/core/IconButton";
import Done from "@material-ui/icons/Done";
import Error from "@material-ui/icons/Error";
import Notifications from "@material-ui/icons/Notifications";
import Close from "@material-ui/icons/Close";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const notification = props => {
	const { classes, message, variant, onClose } = props;

	let snackIcon = null;
	switch (variant) {
		case "info":
			snackIcon = <Notifications className={classes.icon} />;
			break;
		case "success":
			snackIcon = <Done className={classes.icon} />;
			break;
		case "warning":
			snackIcon = <Error className={classes.icon} />;
			break;
		case "danger":
			snackIcon = <Error className={classes.icon} />;
			break;
		default:
			snackIcon = null;
			break;
	}

	return (
		<div className={classes.holder}>
			<Grow in>
				<SnackbarContent
					aria-describedby="notification"
					message={
						<div>
							{snackIcon}
							{message}
						</div>
					}
					action={
						<IconButton
							onClick={() => onClose(props.id)}
							key="close"
							aria-label="close"
							color="inherit"
						>
							<Close className={classes.close} />
						</IconButton>
					}
					classes={{
						root: classes.root + " " + classes[variant],
						message: classes.container + " " + classes.message
					}}
				/>
			</Grow>
		</div>
	);
};

notification.propTypes = {
	classes: PropTypes.object.isRequired,
	id: PropTypes.number.isRequired,
	message: PropTypes.node.isRequired,
	variant: PropTypes.oneOf(["info", "success", "warning", "danger"]),
	onClose: PropTypes.func
};

export default withStyles(styles)(React.memo(notification));
