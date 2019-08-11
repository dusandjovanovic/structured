import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Toolbar from "../../../../components/interface/toolbar/toolbar";

import Add from "@material-ui/icons/Add";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import BorderColor from "@material-ui/icons/BorderColor";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

const spectator = props => {
    const { classes } = props;

    return (
        <Toolbar>
            <Grid container justify="flex-end">
                <Button
                    color="primary"
                    disabled={props.disabled}
                    onClick={() => props.addNode()}
                >
                    <Add className={classes.icon} /> Add node
                </Button>
                <Button
                    color="primary"
                    disabled={props.disabled}
                    onClick={() => props.addEdge()}
                >
                    <Edit className={classes.icon} /> Add edge
                </Button>

                <Button
                    color="primary"
                    disabled={props.disabled}
                    onClick={() => props.removeNode()}
                >
                    <Clear className={classes.icon} /> Remove node
                </Button>

                <Button
                    color="primary"
                    disabled={props.disabled}
                    onClick={() => props.removeEdge()}
                >
                    <BorderColor className={classes.icon} /> Remove edge
                </Button>
            </Grid>
        </Toolbar>
    );
};

export default withStyles(styles)(React.memo(spectator));
