import React from "react";
import Grid from "@material-ui/core/Grid";
import ControlBar from "./control-bar/controlBar";
import SyntaxHighlighter from "react-syntax-highlighter";
import withDraggable from "../../../../hoc/with-draggable/withDraggable";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";
import arduinoLight from "react-syntax-highlighter/dist/esm/styles/hljs/arduino-light";

import {
    ALGORITHM_BREADTH_OBSERVABLE,
    CODE_BREADTH,
    CODE_DEPTH
} from "../../../../utils/constants";

class Algorithm extends React.Component {
    state = {
        algorithmLine: 1
    };

    static getDerivedStateFromProps(props) {
        if (props.algorithmState)
            return {
                algorithmLine: props.algorithmState.algorithmLine
            };
        else
            return {
                algorithmLine: 1
            };
    }

    algorithmInit = () => {
        if (!this.props.algorithmActive) {
            this.props.algorithmVisualize();
        } else {
            this.props.algorithmPause();
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <Grid
                container
                direction="column"
                onMouseDown={this.props.onMouseDown}
                className={classes.root}
                style={{
                    transform: `translate(${this.props.translateX ||
                        0}px, ${this.props.translateY || 0}px)`,
                    cursor: "move"
                }}
            >
                <Grid item xs={12} className={classes.syntax}>
                    <SyntaxHighlighter
                        language="python"
                        style={arduinoLight}
                        wrapLines={true}
                        lineProps={lineNumber => ({
                            style: {
                                display: "block",
                                color:
                                    this.state.algorithmLine === lineNumber
                                        ? "#cbf7ff"
                                        : null,
                                backgroundColor:
                                    this.state.algorithmLine === lineNumber
                                        ? "#4a515b"
                                        : "#ffffff"
                            }
                        })}
                    >
                        {this.props.algorithmType ===
                        ALGORITHM_BREADTH_OBSERVABLE
                            ? CODE_BREADTH
                            : CODE_DEPTH}
                    </SyntaxHighlighter>
                </Grid>
                <Grid item xs={12}>
                    <ControlBar
                        play={this.algorithmInit}
                        playing={this.props.algorithmActive}
                        goToPrevStep={this.props.algorithmPreviousState}
                        goToNextStep={this.props.algorithmNextState}
                    />
                </Grid>
            </Grid>
        );
    }
}

Algorithm.propTypes = {
    classes: PropTypes.object.isRequired,
    algorithmActive: PropTypes.bool,
    algorithmPreviousState: PropTypes.func.isRequired,
    algorithmNextState: PropTypes.func.isRequired,
    algorithmType: PropTypes.string.isRequired,
    algorithmVisualize: PropTypes.func.isRequired,
    algorithmPause: PropTypes.func.isRequired,
    algorithmState: PropTypes.object,
    onMouseDown: PropTypes.func.isRequired,
    translateX: PropTypes.number,
    translateY: PropTypes.number
};

export default withDraggable(withStyles(styles)(Algorithm));
