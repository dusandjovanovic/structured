import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Toolbar from "../../../../components/interface/toolbar/toolbar";

import Add from "@material-ui/icons/Add";
import Clear from "@material-ui/icons/Clear";
import Redo from "@material-ui/icons/Redo";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const spectator = props => {
    const { classes } = props;

    return (
        <Toolbar>
            <Grid container justify="flex-end">
                <Button
                    size="small"
                    color="primary"
                    disabled={props.disabled}
                    onClick={() => props.addNode()}
                >
                    <Add fontSize="small" className={classes.icon} /> Add node
                </Button>
                <Button
                    size="small"
                    color="primary"
                    disabled={props.disabled}
                    onClick={() => props.removeNode()}
                >
                    <Clear fontSize="small" className={classes.icon} /> Remove
                    node
                </Button>
                <Button
                    size="small"
                    color="primary"
                    disabled={props.disabled}
                    onClick={() => props.addEdge()}
                >
                    <Redo fontSize="small" className={classes.icon} /> Add edge
                </Button>
                <Button
                    size="small"
                    color="primary"
                    disabled={props.disabled}
                    onClick={() => props.removeEdge()}
                >
                    <Clear fontSize="small" className={classes.icon} /> Remove
                    edge
                </Button>
            </Grid>
        </Toolbar>
    );
};

export default withStyles(styles)(React.memo(spectator));
