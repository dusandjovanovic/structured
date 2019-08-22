import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import HowToReg from "@material-ui/icons/HowToReg";
import FormContainer from "../../../components/logic/form-container/formContainer";
import { formElements } from "../../../assets/constants/containers/auth/register";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";

import withErrorHandler from "../../../hoc/with-error-handler/withErrorHandler";
import withLoading from "../../../hoc/with-loading/withLoading";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

class Register extends React.Component {
	state = {
		context: {
			remember: false
		},
		error: {
			hasError: false,
			name: null,
			description: null
		}
	};

	rememberMeHandler = event => {
		this.setState({
			context: {
				remember: event.target.checked
			}
		});
	};

	submitHandler = data => {
		if (data.password.value !== data.repeatPassword.value)
			this.setState({
				error: {
					hasError: true,
					name: "Registration error",
					description:
						"Provided passwords don't match. Please try again."
				}
			});
		else {
			this.props.authenticate(
				data.username.value,
				data.password.value,
				this.state.context.remember
			);
		}
	};

	errorHandler = value => {
		this.setState({
			error: {
				...value
			}
		});
	};

	render() {
		const { classes } = this.props;

		return (
			<Grid
				container
				justify="center"
				direction="column"
				className={classes.root}
			>
				<Grid container className={classes.spaced}>
					<Grid item xs={12}>
						<Fab color="secondary" aria-label="Edit">
							<HowToReg />
						</Fab>
					</Grid>
				</Grid>

				<Grid item xs={12}>
					<Divider variant="middle" className={classes.divider} />
				</Grid>

				<FormContainer
					formElements={formElements}
					errorHandler={this.errorHandler}
					submitHandler={this.submitHandler}
					className={classes.inputs}
				>
					{({ inputs, inputChangedHandler, submitHandler }) => {
						return (
							<form
								className={classes.inputs}
								onSubmit={submitHandler}
							>
								<Grid
									container
									justify="center"
									direction="column"
									spacing={1}
								>
									<Grid item xs={12}>
										<TextField
											key={inputs.username.id}
											fullWidth={true}
											margin="normal"
											required
											type={inputs.username.config.type}
											label={inputs.username.config.label}
											placeholder={
												inputs.username.config
													.placeholder
											}
											error={
												inputs.username.touched &&
												!inputs.username.valid
											}
											onChange={event =>
												inputChangedHandler(
													event,
													inputs.username.id
												)
											}
										/>
									</Grid>

									<Grid item>
										<TextField
											key={inputs.password.id}
											fullWidth={true}
											margin="normal"
											required
											type={inputs.password.config.type}
											label={inputs.password.config.label}
											placeholder={
												inputs.password.config
													.placeholder
											}
											error={
												inputs.password.touched &&
												!inputs.password.valid
											}
											onChange={event =>
												inputChangedHandler(
													event,
													inputs.password.id
												)
											}
										/>
									</Grid>

									<Grid item>
										<TextField
											key={inputs.repeatPassword.id}
											fullWidth={true}
											margin="normal"
											required
											type={
												inputs.repeatPassword.config
													.type
											}
											label={
												inputs.repeatPassword.config
													.label
											}
											placeholder={
												inputs.repeatPassword.config
													.placeholder
											}
											error={
												inputs.repeatPassword.touched &&
												!inputs.repeatPassword.valid
											}
											onChange={event =>
												inputChangedHandler(
													event,
													inputs.repeatPassword.id
												)
											}
										/>
									</Grid>

									<Grid item>
										<FormControlLabel
											control={
												<Checkbox
													checked={
														this.state.context
															.remember
													}
													onChange={
														this.rememberMeHandler
													}
													value="checkedB"
													color="primary"
												/>
											}
											label="Remember me"
										/>
									</Grid>

									<Grid item>
										<Button
											type="submit"
											variant="contained"
											color="primary"
										>
											Register now
										</Button>
									</Grid>
								</Grid>
							</form>
						);
					}}
				</FormContainer>

				<Grid
					container
					direction="column"
					className={classes.borderline}
				>
					<Grid item>
						<Typography
							variant="button"
							className={classes.highlighted}
						>
							Already have an account?
						</Typography>
					</Grid>
					<Grid item>
						<Button
							variant="text"
							classes={{ text: classes.override }}
							onClick={this.props.onStateChangeHandler}
						>
							Sign in instead
						</Button>
					</Grid>
				</Grid>
			</Grid>
		);
	}
}

Register.propTypes = {
	classes: PropTypes.object.isRequired,
	waiting: PropTypes.bool.isRequired,
	error: PropTypes.string,
	authenticate: PropTypes.func.isRequired,
	onStateChangeHandler: PropTypes.func.isRequired
};

export default withStyles(styles)(withErrorHandler(withLoading(Register)));
