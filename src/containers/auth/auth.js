import React from "react";
import Register from "./register/register";
import Login from "./login/login";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import {
	authenticateLogin,
	authenticateRegister
} from "../../store/actions/index";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

class Auth extends React.Component {
	state = {
		register: false
	};

	onStateChangeHandler = () => {
		this.setState(prevState => {
			return {
				register: !prevState.register
			};
		});
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				{this.state.register ? (
					<Register
						authenticate={this.props.authenticateRegister}
						onStateChangeHandler={this.onStateChangeHandler}
						waiting={this.props.waiting}
						error={this.props.error}
					/>
				) : (
					<Login
						authenticate={this.props.authenticateLogin}
						onStateChangeHandler={this.onStateChangeHandler}
						waiting={this.props.waiting}
						error={this.props.error}
					/>
				)}

				{this.props.authenticated ? (
					<Redirect to={this.props.redirect} />
				) : null}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		authenticated: state.auth.authenticated,
		waiting: state.auth.waiting,
		error: state.auth.error,
		redirect: state.auth.redirect
	};
};

const mapDispatchToProps = dispatch => {
	return {
		authenticateLogin: (username, password, remember) =>
			dispatch(authenticateLogin(username, password, remember)),
		authenticateRegister: (username, password, remember) =>
			dispatch(authenticateRegister(username, password, remember))
	};
};

Auth.propTypes = {
	classes: PropTypes.object.isRequired,
	authenticated: PropTypes.bool.isRequired,
	waiting: PropTypes.bool.isRequired,
	error: PropTypes.string,
	authenticateLogin: PropTypes.func.isRequired,
	authenticateRegister: PropTypes.func.isRequired,
	redirect: PropTypes.string
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Auth));
