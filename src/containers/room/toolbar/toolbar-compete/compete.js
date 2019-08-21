import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "../../../../components/interface/toolbar/toolbar";
import PropTypes from "prop-types";

import Replay from "@material-ui/icons/Replay";
import SkipNext from "@material-ui/icons/SkipNext";
import Done from "@material-ui/icons/Done";
import Code from "@material-ui/icons/Code";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

import { COMPETE_BREADTH } from "../../../../utils/constants";

class Compete extends React.PureComponent {
	state = {
		anchorEl: null
	};

	handleToggle = event => {
		this.setState({
			anchorEl: event.currentTarget
		});
	};

	handleClose = () => {
		this.setState({
			anchorEl: null
		});
	};

	render() {
		const { classes } = this.props;

		return (
			<Toolbar>
				<Grid container>
					<Grid item xs={3}>
						<Typography
							variant="h6"
							color="textPrimary"
							className={classes.header}
						>
							{this.props.competeType === COMPETE_BREADTH
								? "Breadth-first search"
								: "Depth-first search"}
						</Typography>
					</Grid>
					<Grid item xs={9}>
						<Grid container justify="flex-end">
							<Button
								size="small"
								color="primary"
								disabled={this.props.graphManaged}
								onClick={() => this.props.randomGraph()}
							>
								<Replay
									fontSize="small"
									className={classes.icon}
								/>{" "}
								Random graph
							</Button>
							<Button
								size="small"
								color="primary"
								disabled={
									this.props.graphManaged ||
									!this.props.graphExists
								}
								onClick={() => this.props.competeBegin()}
							>
								<SkipNext
									fontSize="small"
									className={classes.icon}
								/>{" "}
								Begin compete
							</Button>
							<Button
								size="small"
								color="primary"
								disabled={!this.props.graphManaged}
								onClick={() => this.props.competeEnded()}
							>
								<Done
									fontSize="small"
									className={classes.icon}
								/>{" "}
								Submit result
							</Button>
							<Button
								size="small"
								color="secondary"
								aria-controls="algorithm-menu"
								aria-haspopup="true"
								disabled={this.props.graphManaged}
								onClick={this.handleToggle}
							>
								<Code
									fontSize="small"
									color={
										this.props.graphManaged
											? "disabled"
											: "secondary"
									}
									className={classes.icon}
								/>{" "}
								Algorithm
							</Button>
							<Menu
								id="algorithm-menu"
								anchorEl={this.state.anchorEl}
								keepMounted
								open={Boolean(this.state.anchorEl)}
								onClose={this.handleClose}
								disabled={this.props.graphManaged}
							>
								<MenuItem
									onClick={() => {
										this.props.competeBreadth();
										this.handleClose();
									}}
								>
									Breadth-first search (default)
								</MenuItem>
								<MenuItem
									onClick={() => {
										this.props.competeDepth();
										this.handleClose();
									}}
								>
									Depth-first search
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
					</Grid>
				</Grid>
			</Toolbar>
		);
	}
}

Compete.propTypes = {
	classes: PropTypes.object.isRequired,
	graphExists: PropTypes.bool.isRequired,
	graphManaged: PropTypes.bool.isRequired,
	competeBreadth: PropTypes.func.isRequired,
	competeDepth: PropTypes.func.isRequired,
	competeEnded: PropTypes.func.isRequired,
	competeBegin: PropTypes.func.isRequired,
	randomGraph: PropTypes.func.isRequired,
	competeType: PropTypes.string.isRequired,
	leaveRoomIOInit: PropTypes.func.isRequired,
	deleteRoomIOInit: PropTypes.func.isRequired
};

export default withStyles(styles)(Compete);
