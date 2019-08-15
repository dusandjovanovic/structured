import React from "react";
import GraphNode from "./graph-node/graphNode";
import GraphNodeList from "./graph-node-list/graphNodeList";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import { styles } from "./stylesheet";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";

import {
    ALGORITHM_BREADTH_OBSERVABLE,
    ALGORITHM_DEPTH_OBSERVABLE
} from "../../../../utils/constants";

const graphLogger = props => {
    const { classes } = props;

    return (
        <Grid container direction="column" spacing={3} className={classes.root}>
            <GraphNode
                text="selectedNode"
                node={props.nodeSelected ? props.nodeSelected.key : null}
                holderClass={classNames(classes.holder, classes.selectedText)}
                nodeClass={classNames(classes.node, classes.selected)}
                nodeUndefined={classes.nodeUndefined}
            />

            <GraphNodeList
                text="adjacentNodes"
                nodes={props.nodesAdjacent}
                holderClass={classNames(classes.holder, classes.primaryText)}
                nodeClass={classNames(classes.node, classes.adjacent)}
                nodeUndefined={classes.nodeUndefined}
            />

            <GraphNode
                text="rootNode"
                node={props.nodeRoot}
                holderClass={classNames(classes.holder, classes.primaryText)}
                nodeClass={classes.node}
                nodeUndefined={classes.nodeUndefined}
            />

            <GraphNodeList
                text="highlightedNodes"
                nodes={props.nodesHighlighted}
                holderClass={classNames(classes.holder, classes.primaryText)}
                nodeClass={classNames(classes.node, classes.watched)}
                nodeUndefined={classes.nodeUndefined}
            />

            {props.algorithmState ? (
                <React.Fragment>
                    <Grid item xs={12}>
                        <span className={classes.algorithm}>
                            ALGORITHM VARIABLES
                        </span>
                    </Grid>

                    <GraphNode
                        text="currentNode"
                        node={
                            props.algorithmState &&
                            props.algorithmState.tempVertex
                                ? props.algorithmState.tempVertex
                                : null
                        }
                        holderClass={classNames(
                            classes.holder,
                            classes.primaryText
                        )}
                        nodeClass={classNames(classes.node, classes.selected)}
                        nodeUndefined={classes.nodeUndefined}
                    />

                    <GraphNode
                        text="univistedNodes"
                        node={
                            props.algorithmState &&
                            props.algorithmState.unvisitedVertex
                                ? props.algorithmState.unvisitedVertex
                                : null
                        }
                        holderClass={classNames(
                            classes.holder,
                            classes.primaryText
                        )}
                        nodeClass={classes.node}
                        nodeUndefined={classes.nodeUndefined}
                    />

                    <GraphNodeList
                        text="visitedNodes"
                        nodes={props.algorithmState.visited}
                        holderClass={classNames(
                            classes.holder,
                            classes.primaryText
                        )}
                        nodeClass={classes.node}
                        nodeUndefined={classes.nodeUndefined}
                    />

                    <GraphNodeList
                        text="traversedNodes"
                        nodes={props.algorithmState.solution}
                        holderClass={classNames(
                            classes.holder,
                            classes.primaryText
                        )}
                        nodeClass={classNames(classes.node, classes.watched)}
                        nodeUndefined={classes.nodeUndefined}
                    />
                </React.Fragment>
            ) : null}
            {props.algorithmState &&
            props.algorithmType === ALGORITHM_BREADTH_OBSERVABLE ? (
                <GraphNodeList
                    text="queue"
                    nodes={props.algorithmState.structure}
                    holderClass={classNames(
                        classes.holder,
                        classes.primaryText
                    )}
                    nodeClass={classes.node}
                    nodeUndefined={classes.nodeUndefined}
                />
            ) : null}
            {props.algorithmState &&
            props.algorithmType === ALGORITHM_DEPTH_OBSERVABLE ? (
                <GraphNodeList
                    text="stack"
                    nodes={props.algorithmState.structure}
                    holderClass={classNames(
                        classes.holder,
                        classes.primaryText
                    )}
                    nodeClass={classes.node}
                    nodeUndefined={classes.nodeUndefined}
                />
            ) : null}
        </Grid>
    );
};

graphLogger.propTypes = {
    classes: PropTypes.object.isRequired,
    algorithm: PropTypes.bool,
    algorithmState: PropTypes.object,
    algorithmType: PropTypes.string,
    nodeCurrent: PropTypes.string,
    nodeRoot: PropTypes.string,
    nodeSelected: PropTypes.object,
    nodesAdjacent: PropTypes.arrayOf(PropTypes.string),
    nodesHighlighted: PropTypes.arrayOf(PropTypes.string)
};

export default withStyles(styles)(React.memo(graphLogger));
