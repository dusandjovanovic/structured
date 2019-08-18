import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Toolbar from "../../../../components/interface/toolbar/toolbar";
import PropTypes from "prop-types";

import Replay from "@material-ui/icons/Replay";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";

import {
    GRAPH_LEARN_GRAPHS,
    GRAPH_LEARN_REPRESENTATIONS,
    GRAPH_LEARN_TRAVERSALS
} from "../../../../utils/constants";

class Learn extends React.PureComponent {
    state = {
        learn: false
    };

    handleStateChange = value => {
        this.setState({
            learn: value
        });
    };

    handleDialogClose = () => {
        this.setState({
            learn: false
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Toolbar>
                    <Grid container justify="flex-end">
                        <Button
                            size="small"
                            color="primary"
                            onClick={() => this.props.randomGraph()}
                        >
                            <Replay fontSize="small" className={classes.icon} />{" "}
                            Random graph
                        </Button>
                        <Button
                            size="small"
                            color="secondary"
                            onClick={() =>
                                this.handleStateChange(GRAPH_LEARN_GRAPHS)
                            }
                        >
                            What are graphs
                        </Button>
                        <Button
                            size="small"
                            color="secondary"
                            onClick={() =>
                                this.handleStateChange(
                                    GRAPH_LEARN_REPRESENTATIONS
                                )
                            }
                        >
                            Graph presentations
                        </Button>
                        <Button
                            size="small"
                            color="secondary"
                            onClick={() =>
                                this.handleStateChange(GRAPH_LEARN_TRAVERSALS)
                            }
                        >
                            Graph traversals
                        </Button>
                        <Button
                            size="small"
                            color="primary"
                            onClick={() => this.props.leaveRoomIOInit()}
                        >
                            Leave room
                        </Button>
                        <Button
                            size="small"
                            color="primary"
                            onClick={() => this.props.deleteRoomIOInit()}
                        >
                            Delete room
                        </Button>
                    </Grid>
                </Toolbar>
                <Dialog
                    onClose={this.handleDialogClose}
                    aria-labelledby="graph-dialog"
                    open={!!this.state.learn}
                    maxWidth="md"
                >
                    <DialogContent>
                        {this.props.graphLearn(this.state.learn)}
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        );
    }
}

Learn.propTypes = {
    classes: PropTypes.object.isRequired,
    graphLearn: PropTypes.func.isRequired,
    randomGraph: PropTypes.func.isRequired,
    leaveRoomIOInit: PropTypes.func.isRequired,
    deleteRoomIOInit: PropTypes.func.isRequired
};

export default withStyles(styles)(Learn);
