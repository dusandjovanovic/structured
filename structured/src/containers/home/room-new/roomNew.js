import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const RoomNew = props => (
    <Grid
        container
        spacing={2}
        direction="column"
        className={props.classes.root}
    >
        <Grid item xs={12}>
            <Typography variant="h4">Create your own room</Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="h5">
                A new room your friends could join. Everyone can see your
                actions and messages.
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Typography variant="subtitle1">
                By creating a new room you are a room Master, others who join
                are spectators and can see everything you do.
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Button
                color="primary"
                size="large"
                onClick={props.handleNewRoomOpen}
            >
                Create new room
            </Button>
        </Grid>
    </Grid>
);

RoomNew.propTypes = {
    classes: PropTypes.object.isRequired,
    handleNewRoomOpen: PropTypes.func.isRequired
};

export default withStyles(styles)(React.memo(RoomNew));
