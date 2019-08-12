import React from "react";
import FormContainer from "../../../components/logic/form-container/formContainer";
import { formElements } from "../../../assets/constants/containers/home/room-new";
import Slider from "@material-ui/core/Slider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

import withModal from "../../../hoc/with-modal/withModal";
import withErrorHandler from "../../../hoc/with-error-handler/withErrorHandler";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

import {
    ROOM_TYPE_PRACTICE,
    ROOM_TYPE_LEARN,
    ROOM_TYPE_COMPETE
} from "../../../utils/constants";

class RoomNewModal extends React.Component {
    state = {
        error: {
            hasError: false,
            name: null,
            description: null
        },
        selectedMaxUsers: 8,
        selectedRoomType: ROOM_TYPE_LEARN
    };

    addButtonHandler = data => {
        this.props.createAndEnterRoom(
            data.name.value,
            this.state.selectedMaxUsers,
            this.state.selectedRoomType
        );
    };

    errorHandler = value => {
        this.setState(() => ({
            error: {
                ...value
            }
        }));
    };

    handleMaxUsersChange = (event, value) => {
        this.setState({
            selectedMaxUsers: value
        });
    };

    handleRoomTypeChange = event => {
        this.setState({
            selectedRoomType: event.target.value
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.content}>
                <FormContainer
                    formElements={formElements}
                    errorHandler={this.errorHandler}
                    submitHandler={this.addButtonHandler}
                    className={classes.inputs}
                >
                    {({
                        inputs,
                        valid,
                        inputChangedHandler,
                        submitHandler
                    }) => (
                        <React.Fragment>
                            <form className={classes.inputs}>
                                <TextField
                                    key={inputs.name.id}
                                    className={classes.textField}
                                    fullWidth={true}
                                    margin="normal"
                                    required
                                    value={inputs.name.value}
                                    type={inputs.name.config.type}
                                    label={inputs.name.config.label}
                                    placeholder={inputs.name.config.placeholder}
                                    error={
                                        inputs.name.touched &&
                                        !inputs.name.valid
                                    }
                                    onChange={event =>
                                        inputChangedHandler(
                                            event,
                                            inputs.name.id
                                        )
                                    }
                                />

                                <Typography id="discrete-slider" gutterBottom>
                                    Number of users able to join a room:
                                </Typography>
                                <Slider
                                    aria-labelledby="discrete-slider"
                                    className={classes.inputsGroup}
                                    defaultValue={this.state.selectedMaxUsers}
                                    getAriaValueText={value => value}
                                    name="Slider"
                                    valueLabelDisplay="on"
                                    step={1}
                                    marks
                                    min={1}
                                    max={10}
                                    onChange={this.handleMaxUsersChange}
                                />

                                <RadioGroup
                                    className={classes.inputsGroup}
                                    aria-label="room_type"
                                    name="Room type"
                                    value={this.state.selectedRoomType}
                                    onChange={this.handleRoomTypeChange}
                                >
                                    <FormControlLabel
                                        value={ROOM_TYPE_LEARN}
                                        control={<Radio />}
                                        label={ROOM_TYPE_LEARN}
                                    />
                                    <FormControlLabel
                                        value={ROOM_TYPE_PRACTICE}
                                        control={<Radio />}
                                        label={ROOM_TYPE_PRACTICE}
                                    />
                                    <FormControlLabel
                                        value={ROOM_TYPE_COMPETE}
                                        control={<Radio />}
                                        label={ROOM_TYPE_COMPETE}
                                    />
                                </RadioGroup>
                            </form>
                            <div className={classes.buttonContainer}>
                                <Button
                                    variant="text"
                                    size="large"
                                    color="primary"
                                    className={classes.button}
                                    onClick={event => {
                                        submitHandler(event);
                                        if (
                                            Object.keys(inputs).every(
                                                element => inputs[element].valid
                                            )
                                        )
                                            this.props.handleModalClose();
                                    }}
                                >
                                    Create new room
                                </Button>

                                <Button
                                    variant="text"
                                    size="large"
                                    className={classes.button}
                                    onClick={() =>
                                        this.props.handleModalClose()
                                    }
                                >
                                    Close
                                </Button>
                            </div>
                        </React.Fragment>
                    )}
                </FormContainer>
            </div>
        );
    }
}

RoomNewModal.propTypes = {
    classes: PropTypes.object.isRequired,
    createAndEnterRoom: PropTypes.func.isRequired,
    handleModalClose: PropTypes.func.isRequired
};

export default withModal(withStyles(styles)(withErrorHandler(RoomNewModal)));
