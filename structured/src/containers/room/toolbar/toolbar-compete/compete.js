import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "../../../../components/interface/toolbar/toolbar";

import Replay from "@material-ui/icons/Replay";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

class Compete extends React.PureComponent {
    state = {
        anchorEl: null
    };

    handleToggle = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <Toolbar>
                <Grid container>
                    <Grid item xs={3}>
                        <Typography variant="h5">
                            {this.props.competeType === "COMPETE_BREADTH"
                                ? "Breadth-first search"
                                : "Depth-first search"}
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Grid container justify="flex-end">
                            <Button
                                color="primary"
                                disabled={this.props.graphManaged}
                                onClick={() => this.props.randomGraph()}
                            >
                                <Replay className={classes.icon} /> Random graph
                            </Button>
                            <Button
                                color="primary"
                                disabled={
                                    this.props.graphManaged ||
                                    !this.props.graphExists
                                }
                                onClick={() => this.props.competeBegin()}
                            >
                                <Replay className={classes.icon} /> Begin
                            </Button>
                            <Button
                                color="primary"
                                disabled={!this.props.graphManaged}
                                onClick={() => this.props.competeEnded()}
                            >
                                <Replay className={classes.icon} /> Submit
                                result
                            </Button>
                            <Menu
                                id="algorithm-menu"
                                anchorEl={this.state.anchorEl}
                                keepMounted
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleClose}
                                disabled={this.props.graphManaged}
                            >
                                <MenuItem
                                    onClick={() => {
                                        this.props.competeBreadth();
                                        this.handleClose();
                                    }}
                                >
                                    Breadth-first search
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        this.props.competeDepth();
                                        this.handleClose();
                                    }}
                                >
                                    Depth-first search
                                </MenuItem>
                                <MenuItem
                                    disabled={this.props.disabled}
                                    onClick={() => this.handleClose()}
                                >
                                    Cancel algorithm
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        );
    }
}

export default withStyles(styles)(Compete);
