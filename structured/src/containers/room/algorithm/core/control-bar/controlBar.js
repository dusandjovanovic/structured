import React from "react";
import Grid from "@material-ui/core/Grid";

import Play from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
import SkipNext from "@material-ui/icons/SkipNext";
import SkipPrevious from "@material-ui/icons/SkipPrevious";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const ControlBar = props => {
    const { classes } = props;
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.root}
        >
            <Grid item>
                <SkipPrevious
                    fontSize="large"
                    className={classes.button}
                    onClick={() => props.goToPrevStep()}
                />
            </Grid>
            <Grid item>
                {props.playing ? (
                    <Pause
                        fontSize="large"
                        className={classes.button}
                        onClick={() => props.play()}
                    />
                ) : (
                    <Play
                        fontSize="large"
                        className={classes.button}
                        onClick={() => props.play()}
                    />
                )}
            </Grid>
            <Grid item>
                <SkipNext
                    fontSize="large"
                    className={classes.button}
                    onClick={() => props.goToNextStep()}
                />
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(React.memo(ControlBar));
