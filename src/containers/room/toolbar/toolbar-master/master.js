import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "../../../../components/interface/toolbar/toolbar";
import PropTypes from "prop-types";

import Replay from "@material-ui/icons/Replay";
import Add from "@material-ui/icons/Add";
import Clear from "@material-ui/icons/Clear";
import Redo from "@material-ui/icons/Redo";
import Code from "@material-ui/icons/Code";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

import {
	ALGORITHM_BREADTH_OBSERVABLE,
	ALGORITHM_DEPTH_OBSERVABLE
} from "../../../../utils/constants";

class Master extends React.PureComponent {
	state = {
		anchorEl: null
	};

	handleToggle = event => {
		this.setState({
			anchorEl: event.currentTarget
		});
	};

	handleAlgorithm = value => {
		this.setState({
			anchorEl: null
		});
		this.props.algorithmBegin(value);
	};

	handleClose = endAlgorithm => {
		this.setState({
			anchorEl: null
		});
		if (endAlgorithm) this.props.algorithmCanceled();
	};

	render() {
		const { classes } = this.props;

		return (
			<Toolbar>
				<Grid container justify="flex-end">
					<Button
						size="small"
						color="primary"
						disabled={this.props.disabled}
						onClick={() => this.props.randomGraph()}
					>
						<Replay fontSize="small" className={classes.icon} />{" "}
						Random graph
					</Button>
					<Button
						size="small"
						color="primary"
						disabled={this.props.disabled}
						onClick={() => this.props.addNode()}
					>
						<Add fontSize="small" className={classes.icon} /> Add
						node
					</Button>
					<Button
						size="small"
						color="primary"
						disabled={this.props.disabled}
						onClick={() => this.props.removeNode()}
					>
						<Clear fontSize="small" className={classes.icon} />{" "}
						Remove node
					</Button>
					<Button
						size="small"
						color="primary"
						disabled={this.props.disabled}
						onClick={() => this.props.addEdge()}
					>
						<Redo fontSize="small" className={classes.icon} /> Add
						edge
					</Button>
					<Button
						size="small"
						color="primary"
						disabled={this.props.disabled}
						onClick={() => this.props.removeEdge()}
					>
						<Clear fontSize="small" className={classes.icon} />{" "}
						Remove edge
					</Button>
					<Button
						size="small"
						color="secondary"
						aria-controls="algorithm-menu"
						aria-haspopup="true"
						onClick={this.handleToggle}
					>
						<Code
							color="secondary"
							fontSize="small"
							className={classes.icon}
						/>{" "}
						Algorithms
					</Button>
					<Menu
						id="algorithm-menu"
						anchorEl={this.state.anchorEl}
						keepMounted
						open={Boolean(this.state.anchorEl)}
						onClose={() => this.handleClose(false)}
					>
						<MenuItem
							disabled={this.props.disabled}
							onClick={() =>
								this.handleAlgorithm(
									ALGORITHM_BREADTH_OBSERVABLE
								)
							}
						>
							Breadth-first search
						</MenuItem>
						<MenuItem
							disabled={this.props.disabled}
							onClick={() =>
								this.handleAlgorithm(ALGORITHM_DEPTH_OBSERVABLE)
							}
						>
							Depth-first search
						</MenuItem>
						<MenuItem onClick={() => this.handleClose(true)}>
							Cancel
						</MenuItem>
					</Menu>
					<Button
						size="small"
						color="primary"
						onClick={() => this.props.leaveRoomIOInit()}
					>
						Leave room
					</Button>
					<Button
						size="small"
						color="primary"
						onClick={() => this.props.deleteRoomIOInit()}
					>
						Delete room
					</Button>
				</Grid>
			</Toolbar>
		);
	}
}

Master.propTypes = {
	classes: PropTypes.object.isRequired,
	disabled: PropTypes.bool.isRequired,
	randomGraph: PropTypes.func.isRequired,
	addNode: PropTypes.func.isRequired,
	addEdge: PropTypes.func.isRequired,
	removeNode: PropTypes.func.isRequired,
	removeEdge: PropTypes.func.isRequired,
	algorithmBegin: PropTypes.func.isRequired,
	algorithmCanceled: PropTypes.func.isRequired,
	leaveRoomIOInit: PropTypes.func.isRequired,
	deleteRoomIOInit: PropTypes.func.isRequired
};

export default withStyles(styles)(Master);
