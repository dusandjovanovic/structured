import React from "react";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import HowToReg from "@material-ui/icons/HowToReg";
import FormContainer from "../../../components/logic/form-container/formContainer";
import { formElements } from "../../../assets/constants/containers/auth/register";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
            <div className={classes.content}>
                <Fab
                    color="secondary"
                    aria-label="Edit"
                    className={classes.buttonHeadline}
                >
                    <HowToReg />
                </Fab>

                <hr className={classes.horizontalLine} />

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
                                <TextField
                                    key={inputs.username.id}
                                    className={classes.textField}
                                    fullWidth={true}
                                    margin="normal"
                                    required
                                    type={inputs.username.config.type}
                                    label={inputs.username.config.label}
                                    placeholder={
                                        inputs.username.placeholder
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

                                <TextField
                                    key={inputs.password.id}
                                    className={classes.textField}
                                    fullWidth={true}
                                    margin="normal"
                                    required
                                    type={inputs.password.config.type}
                                    label={inputs.password.config.label}
                                    placeholder={
                                        inputs.password.config.placeholder
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

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={
                                                this.state.context.remember
                                            }
                                            onChange={this.rememberMeHandler}
                                            value="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Remember me"
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                >
                                    Sign in
                                </Button>
                            </form>
                        );
                    }}
                </FormContainer>

                <div className={classes.borderline}>
                    <div className={classes.borderlineContent}>
                        Already have an account?
                    </div>
                    <Button
                        color="secondary"
                        size="small"
                        className={classes.buttonBottom}
                        classes={{ text: classes.override }}
                        onClick={this.props.onStateChangeHandler}
                    >
                        Sign in instead
                    </Button>
                </div>
            </div>
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
