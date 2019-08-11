import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Toolbar from "../../../../components/interface/toolbar/toolbar";

import Replay from "@material-ui/icons/Replay";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const compete = props => {
    const { classes } = props;

    return (
        <Toolbar>
            <Grid container>
                <Grid item xs={3}>
                    <Typography variant="h5">
                        {props.competeType === "COMPETE_BREADTH"
                            ? "Breadth-first search"
                            : "Depth-first search"}
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                    <Grid container justify="flex-end">
                        <Button
                            color="primary"
                            disabled={!props.graphManaged}
                            onClick={() => props.competeEnded()}
                        >
                            <Replay className={classes.icon} /> Submit solution
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Toolbar>
    );
};

export default withStyles(styles)(React.memo(compete));
