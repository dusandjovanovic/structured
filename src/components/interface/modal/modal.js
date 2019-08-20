import React from "react";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

class ModalContainer extends React.Component {
	state = {
		open: true
	};

	handleClose = () => {
		this.setState({
			open: false
		});

		this.props.handleClose();
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.container}>
				<Modal
					aria-labelledby="modal-title"
					aria-describedby="modal-description"
					className={classes.modal}
					onClose={this.handleClose}
					open={this.state.open}
				>
					<div className={classes.paper}>
						{this.props.title ? (
							<Typography
								variant="h5"
								className={classes.content}
							>
								{this.props.title}
							</Typography>
						) : null}
						{this.props.children}
					</div>
				</Modal>
			</div>
		);
	}
}

ModalContainer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string
};

export default withStyles(styles)(ModalContainer);
