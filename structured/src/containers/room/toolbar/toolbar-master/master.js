import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "../../../../components/interface/toolbar/toolbar";

import Replay from "@material-ui/icons/Replay";
import Add from "@material-ui/icons/Add";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import BorderColor from "@material-ui/icons/BorderColor";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

import {
    ALGORITHM_BREADTH_OBSERVABLE,
    ALGORITHM_DEPTH_OBSERVABLE
} from "../../../../utils/constants";

class Master extends React.PureComponent {
    state = {
        anchorEl: null
    };

    handleToggle = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleAlgorithm = value => {
        this.setState({
            anchorEl: null
        });
        this.props.algorithmBegin(value);
    };

    handleClose = () => {
        this.setState({
            anchorEl: null
        });
        this.props.algorithmCanceled();
    };

    render() {
        const { classes } = this.props;

        return (
            <Toolbar>
                <Grid container justify="flex-end">
                    <Button
                        color="primary"
                        disabled={this.props.disabled}
                        onClick={() => this.props.randomGraph()}
                    >
                        <Replay className={classes.icon} /> Random graph
                    </Button>
                    <Button
                        color="primary"
                        disabled={this.props.disabled}
                        onClick={() => this.props.addNode()}
                    >
                        <Add className={classes.icon} /> Add node
                    </Button>
                    <Button
                        color="primary"
                        disabled={this.props.disabled}
                        onClick={() => this.props.addEdge()}
                    >
                        <Edit className={classes.icon} /> Add edge
                    </Button>

                    <Button
                        color="primary"
                        disabled={this.props.disabled}
                        onClick={() => this.props.removeNode()}
                    >
                        <Clear className={classes.icon} /> Remove node
                    </Button>

                    <Button
                        color="primary"
                        disabled={this.props.disabled}
                        onClick={() => this.props.removeEdge()}
                    >
                        <BorderColor className={classes.icon} /> Remove edge
                    </Button>
                    <Button
                        color="secondary"
                        variant="outlined"
                        aria-controls="algorithm-menu"
                        aria-haspopup="true"
                        onClick={this.handleToggle}
                    >
                        Algorithms
                    </Button>
                    <Menu
                        id="algorithm-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                    >
                        <MenuItem
                            disabled={this.props.disabled}
                            onClick={() =>
                                this.handleAlgorithm(
                                    ALGORITHM_BREADTH_OBSERVABLE
                                )
                            }
                        >
                            Breadth-first search
                        </MenuItem>
                        <MenuItem
                            disabled={this.props.disabled}
                            onClick={() =>
                                this.handleAlgorithm(ALGORITHM_DEPTH_OBSERVABLE)
                            }
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
            </Toolbar>
        );
    }
}

export default withStyles(styles)(Master);
