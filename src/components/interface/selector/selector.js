import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

class Selector extends React.PureComponent {
	state = {
		status: this.props.status ? this.props.status : "",
		open: false
	};

	componentDidUpdate(prevProps) {
		if (prevProps.status !== this.props.status)
			this.setState({
				status: this.props.status
			});
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value });
		this.props.handleChange(event.target.value);
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	render() {
		const { classes } = this.props;

		return (
			<FormControl className={classes.container}>
				<InputLabel htmlFor="controlled-open-select">
					{this.props.controlName}
				</InputLabel>
				<Select
					open={this.state.open}
					onClose={this.handleClose}
					onOpen={this.handleOpen}
					value={this.state.status}
					onChange={this.handleChange}
					inputProps={{
						name: "status",
						id: "controlled-select"
					}}
				>
					{this.props.data.map(element => (
						<MenuItem key={element} value={element}>
							{element}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		);
	}
}

Selector.propTypes = {
	classes: PropTypes.object.isRequired,
	data: PropTypes.arrayOf(PropTypes.string),
	controlName: PropTypes.string.isRequired,
	handleChange: PropTypes.func.isRequired,
	status: PropTypes.string
};

export default withStyles(styles)(Selector);
