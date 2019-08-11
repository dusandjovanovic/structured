import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Toolbar from "../../../../components/interface/toolbar/toolbar";

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
        learn: null
    };

    handleStateChange = value => {
        this.setState({
            learn: value
        });
    };

    handleDialogClose = () => {
        this.setState({
            learn: null
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Toolbar>
                    <Grid container justify="flex-end">
                        <Button
                            color="primary"
                            onClick={() => this.props.randomGraph()}
                        >
                            <Replay className={classes.icon} /> Random graph
                        </Button>
                        <Button
                            color="secondary"
                            onClick={() =>
                                this.handleStateChange(GRAPH_LEARN_GRAPHS)
                            }
                        >
                            What are graphs
                        </Button>
                        <Button
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
                            color="secondary"
                            onClick={() =>
                                this.handleStateChange(GRAPH_LEARN_TRAVERSALS)
                            }
                        >
                            Graph traversals
                        </Button>
                    </Grid>
                </Toolbar>
                <Dialog
                    onClose={this.handleDialogClose}
                    aria-labelledby="graph-dialog"
                    open={this.state.learn}
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
export default withStyles(styles)(Learn);
